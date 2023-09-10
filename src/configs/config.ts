import { configDotenv } from 'dotenv'
import { resolve } from 'path'
import { GlobalConfig } from './global.config'
import applicationConfig, { ApplicationConfig } from './application.config'
import { ENV } from '@domain/entity/env'

configDotenv({ path: resolve(process.cwd(), '.env') })

export type Config = {
  application: ApplicationConfig
} & GlobalConfig

const config: Config = {
  env: (process.env.ENV as ENV) ?? 'local',
  application: applicationConfig,
}

export default config
