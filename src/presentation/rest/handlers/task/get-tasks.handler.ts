import { Request, Response } from 'express'

export default class GetTasksHandler {
  static async getTasks(_req: Request, res: Response) {
    res.json({ hello: 'Get Tasks' })
  }
}
