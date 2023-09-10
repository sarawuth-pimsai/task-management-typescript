import GetTaskCommentsRepository from '@application/port/repository/comment/get-task-comments.repository'
import { Comment } from '@domain/entity/comment'
import MySQLError from '@errors/mysql.error'
import { lstatSync, readFileSync } from 'fs'
import { ConnectionOptions, Connection, createConnection } from 'mysql2'
export type CommentQueryMySQLOptions = {
  host: string
  username: string
  password: string
  database: string
  port?: number
  ca?: string
}
export default class CommentQueryMySQL implements GetTaskCommentsRepository {
  private readonly defaultConnectionOptions: ConnectionOptions
  constructor(options: CommentQueryMySQLOptions) {
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
  async getTaskComments(taskId: string): Promise<Comment[]> {
    const connection: Connection = this.openConnection()
    const sqlQuery = `
        SELECT
            comment_id AS id,
            comment_description AS description,
            task_id AS taskId,
            user_id AS userId,
            comment_created AS created
        FROM comments
        WHERE task_id = '${taskId}'
    `
    const [result] = await connection.promise().query(sqlQuery)
    this.closeConnection(connection)
    return result as Comment[]
  }
}
