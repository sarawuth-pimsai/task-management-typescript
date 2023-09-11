import UpdateOwnerTaskStatusService from '@application/use-case/task/update-owner-task-status.service'
import TaskContext from '@rest/contexts/task.context'
import { Request, Response } from 'express'

export default class UpdateTaskStatusHandler {
  static async updateTaskStatus(_req: Request, res: Response) {
    const userId: string = _req.context?.me.id
    const taskId: string = _req.params['taskId']
    const status: string = _req.params['status']
    const context = TaskContext.create()
    const service: UpdateOwnerTaskStatusService =
      new UpdateOwnerTaskStatusService(
        context.updateOwnerTaskStatusServiceContext
      )
    const result = service.updateOwnerTaskStatus(userId, taskId, status)
    res.json({ taskId, result })
  }
}
