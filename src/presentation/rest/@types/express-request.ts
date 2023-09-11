declare namespace Express {
  export type Context = {
    me?: any
  }
  export interface Request {
    context?: Context
  }
}
