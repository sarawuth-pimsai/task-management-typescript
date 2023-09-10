import { Request, Response } from 'express'

export default class GetTaskCommentsHandler {
  static async getTaskComments(_req: Request, res: Response) {
    const taskId: string = _req.params['taskId']
    res.json({ taskId, hello: 'Get Task Comments' })
  }
}
