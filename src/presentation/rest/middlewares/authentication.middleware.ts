import config from '@configs/config'
import TokenUtils from '@utils/token.utils'
import { NextFunction, Request, Response } from 'express'
import { IncomingHttpHeaders } from 'http'

export default class AuthenticationMiddler {
  static async authentication(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    const headers: IncomingHttpHeaders = _req.headers
    if (headers.authorization) {
      const [type, token] = headers.authorization.split(' ')
      const payload = TokenUtils.verfiy(token, config.application.secretKey)
    }
    console.log({ headers })
    next()
  }
}
