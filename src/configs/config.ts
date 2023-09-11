import { configDotenv } from 'dotenv'
import { resolve } from 'path'
import { GlobalConfig } from './global.config'
import applicationConfig, { ApplicationConfig } from './application.config'
import { ENV } from '@domain/entity/env'
import mySQLConfigs, { MySQLConfigs } from './mysql.config'

configDotenv({ path: resolve(process.cwd(), '.env') })

export type Config = {
  application: ApplicationConfig
  mysql: MySQLConfigs
} & GlobalConfig

const config: Config = {
  env: process.env.ENV as ENV,
  application: applicationConfig,
  mysql: mySQLConfigs,
}

export default config
