import GetTaskRepository from '@application/port/repository/task/get-task.repository'
import GetTasksRepository from '@application/port/repository/task/get-tasks.repository'
import { Task, TaskFilter } from '@domain/entity/task'
import MySQLError from '@errors/mysql.error'
import { lstatSync, readFileSync } from 'fs'
import { Connection, ConnectionOptions, createConnection } from 'mysql2'

export type TaskQueryMySQLOptions = {
  host: string
  username: string
  password: string
  database: string
  port?: number
  ca?: string
}
export default class TaskQueryMySQL
  implements GetTaskRepository, GetTasksRepository
{
  private readonly defaultConnectionOptions: ConnectionOptions
  constructor(options: TaskQueryMySQLOptions) {
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

  filter(filter: Partial<TaskFilter>): string[] {
    let sqlFilter: string[] = []
    if (filter.status) {
      sqlFilter.push(`task_status = '${filter.status}'`)
    }
    return sqlFilter
  }

  async getTasks(filter?: Partial<TaskFilter> | undefined): Promise<Task[]> {
    let sqlFilter: string[] = []
    if (filter) {
      sqlFilter = this.filter(filter)
    }
    const connection = this.openConnection()
    let sqlQuery = `
      SELECT
        task_id AS id,
        task_topic AS topic,
        task_description AS description,
        task_status AS status,
        user_id AS userId,
        task_created AS created
      FROM tasks
      ${sqlFilter.length > 0 ? `WHERE ${sqlFilter.join(' AND ')}` : ''}
    `
    const [result] = await connection.promise().query(sqlQuery)
    this.closeConnection(connection)
    return result as Task[]
  }

  async getTask(taskId: string): Promise<Task | undefined> {
    const connection = this.openConnection()
    const sqlQuery = `
      SELECT
        task_id AS id,
        task_topic AS topic,
        task_description AS description,
        task_status AS status,
        user_id AS userId,
        task_created AS created
      FROM tasks
      WHERE task_id = '${taskId}'
    `
    const [result] = await connection.promise().query(sqlQuery)
    const tasks: Task[] = result as Task[]
    let task: Task | undefined = undefined
    if (tasks.length > 0) {
      task = tasks[0]
    }
    this.closeConnection(connection)
    return task
  }
}
