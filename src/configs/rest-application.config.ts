import { configDotenv } from 'dotenv'
import { resolve } from 'path'

configDotenv({ path: resolve(process.cwd(), '.env') })

export type RestApplicationConfig = {
  port: number
  baseUrl: string
  origin: string | string[]
  limitPerPage: number
}

const origin: string = process.env.APPLICATION_REST_ORIGIN as string
const restApplicationConfig: RestApplicationConfig = {
  port: parseInt(process.env.APPLICATION_REST_PORT as string),
  baseUrl: process.env.APPLICATION_REST_BASE_URL as string,
  origin: origin.split(','),
  limitPerPage: 50,
}

export default restApplicationConfig
