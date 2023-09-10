import GetTaskCommentsRepository from '@application/port/repository/comment/get-task-comments.repository'
import { GetTaskCommentsServiceContext } from '@application/use-case/comment/get-task-comments.service'
import config from '@configs/config'
import MySQLError from '@errors/mysql.error'
import CommentQueryMySQL, {
  CommentQueryMySQLOptions,
} from '@persistent/mysql/comment-query.mysql'

export default class CommentContext {
  static createCommentQueryMySQL(): CommentQueryMySQL {
    if (
      !config.mysql.query.host ||
      !config.mysql.query.username ||
      !config.mysql.query.password ||
      !config.mysql.query.database
    ) {
      throw new MySQLError('Please check mysql config')
    }
    const commentQueryMySQLOptions: CommentQueryMySQLOptions = {
      host: config.mysql.query.host,
      username: config.mysql.query.username,
      password: config.mysql.query.password,
      database: config.mysql.query.database,
      port: parseInt(config.mysql.query.port ?? '3306'),
      ca: config.mysql.query.ca,
    }
    return new CommentQueryMySQL(commentQueryMySQLOptions)
  }
  static create() {
    const getTaskCommentsRepo: GetTaskCommentsRepository =
      CommentContext.createCommentQueryMySQL()
    const getTaskCommentsServiceContext: GetTaskCommentsServiceContext = {
      getTaskCommentsRepo,
    }
    return { getTaskCommentsServiceContext }
  }
}
