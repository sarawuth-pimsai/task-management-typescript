import DeleteTaskRepository from '@application/port/repository/task/delete-task.repository'
import UpdateTaskStatusRepository from '@application/port/repository/task/update-task-status.repository'
import { TaskStatus } from '@domain/entity/task'
import MySQLError from '@errors/mysql.error'
import { lstatSync, readFileSync } from 'fs'
import { createConnection, Connection, ConnectionOptions } from 'mysql2'

export type TaskCommandMySQLOptions = {
  host: string
  username: string
  password: string
  database: string
  port?: number
  ca?: string
}

export default class TaskCommandMySQL
  implements DeleteTaskRepository, UpdateTaskStatusRepository
{
  private readonly defaultConnectionOptions: ConnectionOptions
  constructor(options: TaskCommandMySQLOptions) {
    let connectionOptions: ConnectionOptions = {
      host: options.host,
      port: options.port ?? 3306,
      user: options.username,
      password: options.password,
      database: options.database,
    }
    if (options.ca && lstatSync(options.ca).isFile()) {
      connectionOptions = {
        ...connectionOptions,
        ssl: { ca: readFileSync(options.ca) },
      }
    }
    this.defaultConnectionOptions = connectionOptions
  }

  openConnection(options?: ConnectionOptions) {
    if (!options) {
      options = this.defaultConnectionOptions
    }
    return createConnection(options)
  }

  closeConnection(connection: Connection) {
    connection.end((err) => {
      if (err) {
        throw new MySQLError(err.message, err.code, err.stack?.split('\n'))
      }
    })
  }

  async updateTaskStatus(taskId: string, status: TaskStatus): Promise<boolean> {
    const connection = this.openConnection()
    const sqlCommand: string = `
        UPDATE tasks SET 
            task_status = '${status}' 
        WHERE task_id = '${taskId}'
    `
    await connection.promise().execute(sqlCommand)
    this.closeConnection(connection)
    return true
  }

  async deleteTask(taskId: string): Promise<boolean> {
    const connection = this.openConnection()
    const sqlCommand: string = `
        DELETE FROM tasks WHERE task_id = '${taskId}'
    `
    await connection.promise().execute(sqlCommand)
    this.closeConnection(connection)
    throw new Error('Method not implemented.')
  }
}
