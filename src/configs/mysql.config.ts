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
    host: process.env.MYSQL_HOST ?? '',
    username: process.env.MYSQL_USER ?? '',
    password: process.env.MYSQL_PASSWORD ?? '',
    database: process.env.MYSQL_DATABASE ?? '',
    port: parseInt(process.env.MYSQL_PORT ?? '3306'),
    ca: process.env.MYSQL_CA,
  },
  query: {
    host: process.env.MYSQL_HOST ?? '',
    username: process.env.MYSQL_USER ?? '',
    password: process.env.MYSQL_PASSWORD ?? '',
    database: process.env.MYSQL_DATABASE ?? '',
    port: parseInt(process.env.MYSQL_PORT ?? '3306'),
    ca: process.env.MYSQL_CA,
  },
}

export default mySQLConfigs
