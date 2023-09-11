import GetUserRepository from '@application/port/repository/user/get-user.repository'
import { GetUserServiceContext } from '@application/use-case/user/get-user.service'
import config from '@configs/config'
import MySQLError from '@errors/mysql.error'
import UserQueryMySQL, {
  UserQueryMySQLOptions,
} from '@persistent/mysql/user-query.mysql'

export default class UserContext {
  static createUserQueryMySQL(): UserQueryMySQL {
    const userQueryMySQLOption: UserQueryMySQLOptions = {
      host: config.mysql.query.host,
      username: config.mysql.query.username,
      password: config.mysql.query.password,
      database: config.mysql.query.database,
      port: config.mysql.query.port,
      ca: config.mysql.query.ca,
    }
    return new UserQueryMySQL(userQueryMySQLOption)
  }
  static create() {
    const getUserRepo: GetUserRepository = UserContext.createUserQueryMySQL()
    const getUserServiceContext: GetUserServiceContext = {
      getUserRepo,
    }
    return { getUserServiceContext }
  }
}
