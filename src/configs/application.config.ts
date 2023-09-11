import restApplicationConfig, {
  RestApplicationConfig,
} from './rest-application.config'

export type ApplicationConfig = {
  rest: RestApplicationConfig
  secretKey: string
  refreshKey: string
}

const applicationConfig: ApplicationConfig = {
  rest: restApplicationConfig,
  secretKey: process.env.APPLICATION_SECRET_KEY as string,
  refreshKey: process.env.APPLICATION_REFRESH_KEY as string,
}

export default applicationConfig
