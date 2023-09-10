import DefaultError from './default.error'

export default class MySQLError extends DefaultError {
  constructor(message: string, code: string = '5003', detail?: string[]) {
    super(message, 503, code, 'MySQL_ERROR', detail)
  }
}
