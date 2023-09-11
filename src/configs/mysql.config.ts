export type MySQLConfig = {
  host: string
  username: string
  password: string
  database: string
  port: number
  ca?: string
}

export type MySQLConfigs = {
  command: MySQLConfig
  query: MySQLConfig
}

const mySQLConfigs: MySQLConfigs = {
  command: {
    host: process.env.MYSQL_COMMAND_HOST ?? '',
    username: process.env.MYSQL_COMMAND_USERNAME ?? '',
    password: process.env.MYSQL_COMMAND_PASSWORD ?? '',
    database: process.env.MYSQL_COMMAND_DATABASE ?? '',
    port: parseInt(process.env.MYSQL_COMMAND_PORT ?? '3306'),
    ca: process.env.MYSQL_COMMAND_CA,
  },
  query: {
    host: process.env.MYSQL_QUERY_HOST ?? '',
    username: process.env.MYSQL_QUERY_USERNAME ?? '',
    password: process.env.MYSQL_QUERY_PASSWORD ?? '',
    database: process.env.MYSQL_QUERY_DATABASE ?? '',
    port: parseInt(process.env.MYSQL_QUERY_PORT ?? '3306'),
    ca: process.env.MYSQL_QUERY_CA,
  },
}

export default mySQLConfigs
