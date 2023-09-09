import GetUserRepository from '@application/port/repository/user/get-user.repository'
import { User } from '@domain/entity/user'

export type GetUserMemoryConfig = {
  users: User[]
}
export default class GetUserMemory implements GetUserRepository {
  private readonly users: User[]
  constructor(config: GetUserMemoryConfig) {
    this.users = config.users
  }
  async getUser(userId: string): Promise<User | undefined> {
    let user: User | undefined = undefined
    const result: User[] = this.users.filter((user) => user.id === userId)
    if (result.length > 0) {
      user = { ...result[0] }
    }
    return user
  }
}
