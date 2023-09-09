import DefaultError from './default.error'

export default class ForbiddenError extends DefaultError {
  constructor(message: string, code: string = `4003`, detail?: string[]) {
    super(message, 403, code, 'FORBIDDEN', detail)
  }
}
