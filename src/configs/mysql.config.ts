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
    host: process.env.MYSQL_HOST as string,
    username: process.env.MYSQL_USER as string,
    password: process.env.MYSQL_PASSWORD as string,
    database: process.env.MYSQL_DATABASE as string,
    port: parseInt(process.env.MYSQL_PORT as string),
    ca: process.env.MYSQL_CA,
  },
  query: {
    host: process.env.MYSQL_HOST as string,
    username: process.env.MYSQL_USER as string,
    password: process.env.MYSQL_PASSWORD as string,
    database: process.env.MYSQL_DATABASE as string,
    port: parseInt(process.env.MYSQL_PORT as string),
    ca: process.env.MYSQL_CA,
  },
}

export default mySQLConfigs
