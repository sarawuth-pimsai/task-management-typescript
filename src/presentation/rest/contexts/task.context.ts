import { DeleteOwnerTaskServiceContext } from '@application/use-case/task/delete-owner-task.service'
import { GetTaskServiceContext } from '@application/use-case/task/get-task.service'
import { GetTasksServiceContext } from '@application/use-case/task/get-tasks.service'
import { UpdateOwnerTaskStatusServiceContext } from '@application/use-case/task/update-owner-task-status.service'
import config from '@configs/config'
import MySQLError from '@errors/mysql.error'
import CommentCommandMySQL, {
  CommentCommandMySQLOptions,
} from '@persistent/mysql/comment-command.mysql'
import TaskCommandMySQL, {
  TaskCommandMySQLOptions,
} from '@persistent/mysql/task-command.mysql'
import TaskQueryMySQL, {
  TaskQueryMySQLOptions,
} from '@persistent/mysql/task-query.mysql'
import UserQueryMySQL, {
  UserQueryMySQLOptions,
} from '@persistent/mysql/user-query.mysql'

export default class TaskContext {
  static createCommentCommandMySQL(): CommentCommandMySQL {
    if (
      !config.mysql.command.host ||
      !config.mysql.command.username ||
      !config.mysql.command.password ||
      !config.mysql.command.database
    ) {
      throw new MySQLError('Please check mysql config')
    }
    const commentCommandMySQLOptions: CommentCommandMySQLOptions = {
      host: config.mysql.command.host,
      username: config.mysql.command.username,
      password: config.mysql.command.password,
      database: config.mysql.command.database,
      port: parseInt(config.mysql.command.port ?? '3306'),
      ca: config.mysql.command.ca,
    }
    return new CommentCommandMySQL(commentCommandMySQLOptions)
  }

  static createTaskQueryMySQL(): TaskQueryMySQL {
    if (
      !config.mysql.query.host ||
      !config.mysql.query.username ||
      !config.mysql.query.password ||
      !config.mysql.query.database
    ) {
      throw new MySQLError('Please check mysql config')
    }
    const taskQueryMySQLOptions: TaskQueryMySQLOptions = {
      host: config.mysql.query.host,
      username: config.mysql.query.username,
      password: config.mysql.query.password,
      database: config.mysql.query.database,
      port: parseInt(config.mysql.query.port ?? '3306'),
      ca: config.mysql.query.ca,
    }
    return new TaskQueryMySQL(taskQueryMySQLOptions)
  }

  static createTaskCommandMySQL(): TaskCommandMySQL {
    if (
      !config.mysql.command.host ||
      !config.mysql.command.username ||
      !config.mysql.command.password ||
      !config.mysql.command.database
    ) {
      throw new MySQLError('Please check mysql config')
    }
    const taskCommandMySQLOptions: TaskCommandMySQLOptions = {
      host: config.mysql.command.host,
      username: config.mysql.command.username,
      password: config.mysql.command.password,
      database: config.mysql.command.database,
      port: parseInt(config.mysql.command.port ?? '3306'),
      ca: config.mysql.command.ca,
    }
    return new TaskCommandMySQL(taskCommandMySQLOptions)
  }

  static createUserQueryMySQL(): UserQueryMySQL {
    if (
      !config.mysql.query.host ||
      !config.mysql.query.username ||
      !config.mysql.query.password ||
      !config.mysql.query.database
    ) {
      throw new MySQLError('Please check mysql config')
    }
    const userQueryMySQLOptions: UserQueryMySQLOptions = {
      host: config.mysql.query.host,
      username: config.mysql.query.username,
      password: config.mysql.query.password,
      database: config.mysql.query.database,
      port: parseInt(config.mysql.query.port ?? '3306'),
      ca: config.mysql.query.ca,
    }
    return new UserQueryMySQL(userQueryMySQLOptions)
  }

  static create() {
    const commentCommandMySQL: CommentCommandMySQL =
      TaskContext.createCommentCommandMySQL()

    const taskQueryMySQL: TaskQueryMySQL = TaskContext.createTaskQueryMySQL()

    const taskCommandMySQL: TaskCommandMySQL =
      TaskContext.createTaskCommandMySQL()

    const userQueryMySQL: UserQueryMySQL = TaskContext.createUserQueryMySQL()

    const getTaskServiceContext: GetTaskServiceContext = {
      getTaskRepo: taskQueryMySQL,
    }

    const getTasksServiceContext: GetTasksServiceContext = {
      getTasksRepo: taskQueryMySQL,
    }

    const updateOwnerTaskStatusServiceContext: UpdateOwnerTaskStatusServiceContext =
      {
        getUserRepo: userQueryMySQL,
        getTaskRepo: taskQueryMySQL,
        updateTaskStatusRepo: taskCommandMySQL,
      }

    const deleteOwnerTaskServiceContext: DeleteOwnerTaskServiceContext = {
      getTaskRepo: taskQueryMySQL,
      getUserRepo: userQueryMySQL,
      deleteTaskRepo: taskCommandMySQL,
      deleteTaskComentsRepo: commentCommandMySQL,
    }

    return {
      getTaskServiceContext,
      getTasksServiceContext,
      updateOwnerTaskStatusServiceContext,
      deleteOwnerTaskServiceContext,
    }
  }
}
