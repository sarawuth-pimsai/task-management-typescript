export default class DefaultError extends Error {
  readonly message: string
  readonly httpStatus: number
  readonly code: string
  readonly type: string
  readonly detail: string[] | undefined
  constructor(
    message: string,
    httpStatus: number,
    code: string,
    type: string,
    detail?: string[]
  ) {
    super(message)
    this.message = message
    this.httpStatus = httpStatus
    this.code = code
    this.type = type
    this.detail = detail
  }
}
