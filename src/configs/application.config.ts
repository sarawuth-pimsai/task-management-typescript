import restApplicationConfig, {
  RestApplicationConfig,
} from './rest-application.config'

export type ApplicationConfig = {
  rest: RestApplicationConfig
}

const applicationConfig: ApplicationConfig = {
  rest: restApplicationConfig,
}

export default applicationConfig
