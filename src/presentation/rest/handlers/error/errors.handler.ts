import config from '@configs/config'
import DefaultError from '@errors/default.error'
import { ResponseErrors } from '@rest/entity/response'
import { NextFunction, Request, Response } from 'express'

export default class ErrorsHandler {
  static errors(
    error: Error,
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (error) {
      let defaultError: DefaultError
      if (error instanceof DefaultError) {
        defaultError = error
      } else {
        defaultError = new DefaultError(error.message, 500, '5000', 'UNKNOW')
      }
      let errors: ResponseErrors = {
        code: defaultError.code,
        mesage: defaultError.message,
      }
      if (config.env === 'dev') {
        errors.type = defaultError.type
        errors.detail = error.stack?.split('\n')
      }
      res.status(defaultError.httpStatus).json({ errors })
    }
    next()
  }
}
