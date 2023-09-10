import GetTasksService from '@application/use-case/task/get-tasks.service'
import { TaskFilter, TaskStatus } from '@domain/entity/task'
import TaskContext from '@rest/contexts/task.context'
import { Request, Response } from 'express'

export default class GetTasksHandler {
  static async getTasks(_req: Request, res: Response) {
    const context = TaskContext.create()
    let filter: TaskFilter | undefined = undefined
    if (_req.query.status) {
      filter = { status: _req.query.status as TaskStatus }
    }
    const service: GetTasksService = new GetTasksService(
      context.getTasksServiceContext
    )
    const result = await service.getTasks(filter)
    res.json(result)
  }
}
