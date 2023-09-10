import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import { ENV } from '@domain/entity/env'
import TaskRouter from './routes/task.router'
import ErrorsHandler from './handlers/error/errors.handler'
import AuthenticationMiddler from './middlewares/authentication.middleware'

export type RestApplicationOptions = {
  port: number
  baseUrl: string
  origin: string | string[]
  env: ENV
}
export default class RestApplication {
  private readonly app: Express
  private readonly port: number
  private readonly baseUrl: string
  private readonly origin: string | string[]
  private readonly env: ENV
  constructor(options: RestApplicationOptions) {
    this.app = express()
    this.port = options.port
    this.baseUrl = options.baseUrl
    this.env = options.env
    this.origin = options.origin
    this.initialGlobal()
    this.initialRoutes()
  }
  initialGlobal() {
    const logFormat = this.env === 'dev' ? 'tiny' : 'combined'
    this.app.use(cors({ origin: this.origin }))
    this.app.use(helmet())
    this.app.use(morgan(logFormat))
  }
  initialRoutes() {
    this.app.use(
      `${this.baseUrl}/tasks`,
      AuthenticationMiddler.authentication,
      TaskRouter.initial()
    )
    this.app.use(`${this.baseUrl}`, function (_req: Request, res: Response) {
      res.json({ notfound: 'page' })
    })
    this.app.use(ErrorsHandler.errors)
  }
  start() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port: ${this.port}`)
    })
  }
}
