import GetTaskCommentsService from '@application/use-case/comment/get-task-comments.service'
import CommentContext from '@rest/contexts/comment.context'
import { Request, Response } from 'express'

export default class GetTaskCommentsHandler {
  static async getTaskComments(_req: Request, res: Response) {
    const taskId: string = _req.params['taskId']
    const context = CommentContext.create()
    const service: GetTaskCommentsService = new GetTaskCommentsService(
      context.getTaskCommentsServiceContext
    )
    const result = await service.getTaskComments(taskId)
    res.json({ result })
  }
}
