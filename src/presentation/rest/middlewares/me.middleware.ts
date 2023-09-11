import config from '@configs/config'
import TokenUtils from '@utils/token.utils'
import { NextFunction, Request, Response } from 'express'
import { IncomingHttpHeaders } from 'http'

export default class MeMiddleware {
  static me(_req: Request, res: Response, next: NextFunction) {
    const headers: IncomingHttpHeaders = _req.headers
    if (headers.authorization) {
      const [bearer, token] = headers.authorization.split(' ')
      if (bearer === 'Bearer' && !!token) {
        try {
          const result = TokenUtils.verfiy(token, config.application.secretKey)
          _req.context = { me: result as any }
        } catch (error) {}
      }
    }
    next()
  }
}
