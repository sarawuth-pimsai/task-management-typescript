import DefaultError from './default.error'

export default class MySQLError extends DefaultError {
  constructor(message: string, code: string = '5001', detail?: string[]) {
    super(message, 500, code, 'MySQL_ERROR', detail)
  }
}
