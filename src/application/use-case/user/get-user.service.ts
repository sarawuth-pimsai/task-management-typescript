import GetUserRepository from '@application/port/repository/user/get-user.repository'
import { User } from '@domain/entity/user'
import GetUserUseCase from '@domain/use-case/user/get-user.use-case'

export type GetUserServiceContext = {
  getUserRepo: GetUserRepository
}
export default class GetUserService implements GetUserUseCase {
  private readonly getUserRepos: GetUserRepository
  constructor(context: GetUserServiceContext) {
    this.getUserRepos = context.getUserRepo
  }
  async getUser(userId: string): Promise<User | undefined> {
    throw new Error('Method not implemented.')
  }
}
