import GetTaskService from '@application/use-case/task/get-task.service'
import TaskContext from '@rest/contexts/task.context'
import { Request, Response } from 'express'

export default class GetTaskHandler {
  static async getTask(_req: Request, res: Response) {
    const taskId: string = _req.params['taskId']
    const context = TaskContext.create()
    const service: GetTaskService = new GetTaskService(
      context.getTaskServiceContext
    )
    const result = await service.getTask(taskId)
    res.json(result)
  }
}
