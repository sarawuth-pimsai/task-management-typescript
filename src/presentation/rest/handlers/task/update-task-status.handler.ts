import { Request, Response } from 'express'

export default class UpdateTaskStatusHandler {
  static async updateTaskStatus(_req: Request, res: Response) {
    const taskId: string = _req.params['taskId']
    res.json({ taskId })
  }
}
