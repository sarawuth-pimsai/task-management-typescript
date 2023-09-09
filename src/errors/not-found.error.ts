import DefaultError from './default.error'

export default class NotFoundError extends DefaultError {
  constructor(message: string, code: string = `4004`, detail?: string[]) {
    super(message, 404, code, 'NOT_FOUND', detail)
  }
}
