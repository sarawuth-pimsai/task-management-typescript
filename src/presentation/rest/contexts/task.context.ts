import config from '@configs/config'
import { GetTaskServiceContext } from '@application/use-case/task/get-task.service'
import { GetTasksServiceContext } from '@application/use-case/task/get-tasks.service'
import { DeleteOwnerTaskServiceContext } from '@application/use-case/task/delete-owner-task.service'
import { UpdateOwnerTaskStatusServiceContext } from '@application/use-case/task/update-owner-task-status.service'
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
    const commentCommandMySQLOptions: CommentCommandMySQLOptions = {
      host: config.mysql.command.host,
      username: config.mysql.command.username,
      password: config.mysql.command.password,
      database: config.mysql.command.database,
      port: config.mysql.command.port,
      ca: config.mysql.command.ca,
    }
    return new CommentCommandMySQL(commentCommandMySQLOptions)
  }

  static createTaskQueryMySQL(): TaskQueryMySQL {
    const taskQueryMySQLOptions: TaskQueryMySQLOptions = {
      host: config.mysql.query.host,
      username: config.mysql.query.username,
      password: config.mysql.query.password,
      database: config.mysql.query.database,
      port: config.mysql.query.port,
      ca: config.mysql.query.ca,
    }
    return new TaskQueryMySQL(taskQueryMySQLOptions)
  }

  static createTaskCommandMySQL(): TaskCommandMySQL {
    const taskCommandMySQLOptions: TaskCommandMySQLOptions = {
      host: config.mysql.command.host,
      username: config.mysql.command.username,
      password: config.mysql.command.password,
      database: config.mysql.command.database,
      port: config.mysql.command.port,
      ca: config.mysql.command.ca,
    }
    return new TaskCommandMySQL(taskCommandMySQLOptions)
  }

  static createUserQueryMySQL(): UserQueryMySQL {
    const userQueryMySQLOptions: UserQueryMySQLOptions = {
      host: config.mysql.query.host,
      username: config.mysql.query.username,
      password: config.mysql.query.password,
      database: config.mysql.query.database,
      port: config.mysql.query.port,
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
