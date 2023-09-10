export type MySQLConfig = {
  host: string
  username: string
  password: string
  database: string
  port: string
  ca: string
}

export type MySQLConfigs = {
  command: Partial<MySQLConfig>
  query: Partial<MySQLConfig>
}

const mySQLConfigs: MySQLConfigs = {
  command: {
    host: process.env.MYSQL_COMMAND_HOST,
    username: process.env.MYSQL_COMMAND_USERNAME,
    password: process.env.MYSQL_COMMAND_PASSWORD,
    database: process.env.MYSQL_COMMAND_DATABASE,
    port: process.env.MYSQL_COMMAND_PORT,
    ca: process.env.MYSQL_COMMAND_CA,
  },
  query: {
    host: process.env.MYSQL_QUERY_HOST,
    username: process.env.MYSQL_QUERY_USERNAME,
    password: process.env.MYSQL_QUERY_PASSWORD,
    database: process.env.MYSQL_QUERY_DATABASE,
    port: process.env.MYSQL_QUERY_PORT,
    ca: process.env.MYSQL_QUERY_CA,
  },
}

export default mySQLConfigs
