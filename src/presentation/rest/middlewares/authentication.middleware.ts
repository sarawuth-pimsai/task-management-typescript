import { NextFunction, Request, Response } from 'express'
import { IncomingHttpHeaders } from 'http'

export default class AuthenticationMiddler {
  static async authentication(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    const headers: IncomingHttpHeaders = _req.headers
    console.log({ headers })
    next()
  }
}
