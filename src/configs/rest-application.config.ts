import { configDotenv } from 'dotenv'
import { resolve } from 'path'

configDotenv({ path: resolve(process.cwd(), '.env') })

export type RestApplicationConfig = {
  port: number
  baseUrl: string
  origin: string | string[]
}

const restApplicationConfig: RestApplicationConfig = {
  port: parseInt(process.env.APPLICATION_REST_PORT ?? '3000'),
  baseUrl: process.env.APPLICATION_REST_BASE_URL ?? '',
  origin: process.env.APPLICATION_REST_ORIGIN?.split(',') ?? '*',
}

export default restApplicationConfig
