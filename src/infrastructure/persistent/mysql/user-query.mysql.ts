import GetUserRepository from '@application/port/repository/user/get-user.repository'
import { User } from '@domain/entity/user'
import MySQLError from '@errors/mysql.error'
import { lstatSync, readFileSync } from 'fs'
import { createConnection, ConnectionOptions, Connection } from 'mysql2'

export type UserQueryMySQLOptions = {
  host: string
  username: string
  password: string
  database: string
  port?: number
  ca?: string
}

export default class UserQueryMySQL implements GetUserRepository {
  private readonly defaultConnectionOptions: ConnectionOptions
  constructor(options: UserQueryMySQLOptions) {
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

  private openConnection(options?: ConnectionOptions) {
    if (!options) {
      options = this.defaultConnectionOptions
    }
    return createConnection(options)
  }

  private closeConnection(connection: Connection) {
    connection.end((err) => {
      if (err) {
        throw new MySQLError(err.message, err.code, err.stack?.split('\n'))
      }
    })
  }

  async getUser(userId: string): Promise<User | undefined> {
    const connection = this.openConnection()
    const sqlQuery: string = `
        SELECT
            user_id AS id,
            user_display_name AS displayName,
            user_avatar AS avatar
        FROM users
        WHERE user_id = '${userId}'
    `
    const [result] = await connection.promise().query(sqlQuery)
    let users: User[] = result as User[]
    let user: User | undefined = undefined
    if (users.length > 0) {
      user = users[0]
    }
    this.closeConnection(connection)
    return user
  }
}
