import DefaultError from './default.error'

export default class InvalidParamsError extends DefaultError {
  constructor(message: string, code: string = `4000`, detail?: string[]) {
    super(message, 400, code, 'INVALID_PARAMS', detail)
  }
}
