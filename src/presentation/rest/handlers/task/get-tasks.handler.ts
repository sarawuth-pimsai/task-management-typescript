import GetTasksRepository from '@application/port/repository/task/get-tasks.repository'
import GetTasksService, {
  GetTasksServiceContext,
} from '@application/use-case/task/get-tasks.service'
import TaskQueryMySQL, {
  TaskQueryMySQLOptions,
} from '@persistent/mysql/task-query.mysql'
import { Request, Response } from 'express'

export default class GetTasksHandler {
  static async getTasks(_req: Request, res: Response) {
    const taskQueryMySQLOptions: TaskQueryMySQLOptions = {
      host: 'localhost',
      username: 'pdev',
      password: 'SayYIacI2METzgKtLaXjaT81FJqp4bep',
      database: 'portal_dev',
    }
    const taskQueryMysQL: TaskQueryMySQL = new TaskQueryMySQL(
      taskQueryMySQLOptions
    )
    const getTasksRepo: GetTasksRepository = taskQueryMysQL
    const getTasksServiceContext: GetTasksServiceContext = {
      getTasksRepo,
    }
    const getTasksService: GetTasksService = new GetTasksService(
      getTasksServiceContext
    )
    const result = await getTasksService.getTasks()
    res.json({ hello: result })
  }
}
