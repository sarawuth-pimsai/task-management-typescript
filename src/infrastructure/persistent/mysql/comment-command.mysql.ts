import DeleteTaskCommentsRepository from '@application/port/repository/comment/delete-task-comments.repository'
import MySQLError from '@errors/mysql.error'
import { lstatSync, readFileSync } from 'fs'
import { Connection, ConnectionOptions, createConnection } from 'mysql2'

export type CommentCommandMySQLOptions = {
  host: string
  username: string
  password: string
  database: string
  port?: number
  ca?: string
}
export default class CommentCommandMySQL
  implements DeleteTaskCommentsRepository
{
  private readonly defaultConnectionOptions: ConnectionOptions
  constructor(options: CommentCommandMySQLOptions) {
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
  async deleteTaskComments(taskId: string): Promise<boolean> {
    const connection: Connection = this.openConnection()
    const sqlCommand: string = `
        DELETE FROM comments WHERE task_id = '${taskId}'
    `
    await connection.promise().execute(sqlCommand)
    this.closeConnection(connection)
    return true
  }
}
