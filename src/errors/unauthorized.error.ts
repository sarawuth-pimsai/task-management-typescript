import DefaultError from './default.error'

export default class UnauthorizedError extends DefaultError {
  constructor(message: string, code: string = '4001', detail?: string[]) {
    super(message, 401, '4001', 'Unauthorized', detail)
  }
}
