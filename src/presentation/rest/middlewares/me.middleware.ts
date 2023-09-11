import config from '@configs/config'
import TokenUtils from '@utils/token.utils'
import { NextFunction, Request, Response } from 'express'
import { IncomingHttpHeaders } from 'http'

export default class MeMiddleware {
  static me(_req: Request, res: Response, next: NextFunction) {
    const headers: IncomingHttpHeaders = _req.headers
    headers.authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ3M2JlNzlmLWE3MTMtNDc4ZS05ZjI2LTU3ZTdhZDYyZWNmMiIsImRpc3BsYXlOYW1lIjoibmljb2xlLnJvZ2VycyIsImF2YXRhciI6Imh0dHBzOi8vZ3JhdmF0YXIuY29tL2F2YXRhci83ZWZmMGQ3Mzg3YjgwNTNkODk5ZTE3ZGQyN2NiMzE5OT9zPTQwMCZkPXJvYm9oYXNoJnI9eCIsImlhdCI6MTY5NDQ0NDI2MywiZXhwIjoxNjk0NDQ0NDQzfQ.OgGk1WSQMI4LWUEDDz_A3mg886qN1rcNdfZeuvLcwPc    `
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
