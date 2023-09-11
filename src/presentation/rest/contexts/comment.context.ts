import config from '@configs/config'
import GetTaskCommentsRepository from '@application/port/repository/comment/get-task-comments.repository'
import { GetTaskCommentsServiceContext } from '@application/use-case/comment/get-task-comments.service'
import CommentQueryMySQL, {
  CommentQueryMySQLOptions,
} from '@persistent/mysql/comment-query.mysql'

export default class CommentContext {
  static createCommentQueryMySQL(): CommentQueryMySQL {
    const commentQueryMySQLOptions: CommentQueryMySQLOptions = {
      host: config.mysql.query.host,
      username: config.mysql.query.username,
      password: config.mysql.query.password,
      database: config.mysql.query.database,
      port: config.mysql.query.port,
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
