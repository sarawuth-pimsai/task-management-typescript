import config from '@configs/config'
import RestApplication, { RestApplicationOptions } from '@rest/rest'

const restApplicationOptions: RestApplicationOptions = {
  port: config.application.rest.port,
  baseUrl: config.application.rest.baseUrl,
  origin: config.application.rest.origin,
  env: config.env,
}

const restApplication: RestApplication = new RestApplication(
  restApplicationOptions
)

restApplication.start()
