import { Request, Response } from 'express'

export default class DeleteTaskHandler {
  static async deleteTask(_req: Request, res: Response) {
    res.json({ hello: 'Delete task' })
  }
}
