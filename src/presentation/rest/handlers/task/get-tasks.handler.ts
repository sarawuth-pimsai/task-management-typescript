import GetTasksService from '@application/use-case/task/get-tasks.service'
import { Task, TaskFilter, TaskStatus } from '@domain/entity/task'
import TaskContext from '@rest/contexts/task.context'
import { Request, Response } from 'express'

export default class GetTasksHandler {
  static async getTasks(_req: Request, res: Response) {
    const context = TaskContext.create()
    let filter: TaskFilter = {
      page: 1,
    }
    if (_req.query.status) {
      filter = { ...filter, status: _req.query.status as TaskStatus }
    }
    if (_req.query.page) {
      filter = { ...filter, page: parseInt(_req.query.page as string) }
    }
    if (_req.query.limit) {
      filter = { ...filter, limit: parseInt(_req.query.limit as string) }
    }
    const service: GetTasksService = new GetTasksService(
      context.getTasksServiceContext
    )
    const result: Task[] = await service.getTasks(filter)
    res.json({ data: result })
  }
}
