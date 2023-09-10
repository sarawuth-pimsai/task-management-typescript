import { Request, Response } from 'express'

export default class GetTaskHandler {
  static async getTask(_req: Request, res: Response) {
    res.json({ hello: 'Get Task' })
  }
}
