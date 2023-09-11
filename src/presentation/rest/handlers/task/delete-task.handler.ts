import DeleteOwnerTaskService from '@application/use-case/task/delete-owner-task.service'
import TaskContext from '@rest/contexts/task.context'
import { Request, Response } from 'express'

export default class DeleteTaskHandler {
  static async deleteTask(_req: Request, res: Response) {
    const context = TaskContext.create()
    const service: DeleteOwnerTaskService = new DeleteOwnerTaskService(
      context.deleteOwnerTaskServiceContext
    )
    const userId: string = _req.context?.me.id
    const taskId: string = _req.params['taskId']
    const result: boolean = await service.deleteOwnerTask(userId, taskId)
    res.json({ status: result })
  }
}
