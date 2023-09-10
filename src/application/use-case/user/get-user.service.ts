import GetUserRepository from '@application/port/repository/user/get-user.repository'
import { User } from '@domain/entity/user'
import GetUserUseCase from '@domain/use-case/user/get-user.use-case'
import InvalidParamsError from '@errors/invalid-params.error'
import NotFoundError from '@errors/not-found.error'
import ValidateUtil from '@utils/validate.utils'

export type GetUserServiceContext = {
  getUserRepo: GetUserRepository
}
export default class GetUserService implements GetUserUseCase {
  private readonly getUserRepos: GetUserRepository
  constructor(context: GetUserServiceContext) {
    this.getUserRepos = context.getUserRepo
  }
  async getUser(userId: string): Promise<User | undefined> {
    let user: User | undefined
    const isUserIdValid: boolean = ValidateUtil.userId(userId)
    if (isUserIdValid === false) {
      throw new InvalidParamsError(`Invalid userId`)
    }
    user = await this.getUserRepos.getUser(userId)
    if (!user) {
      throw new NotFoundError(`Can't found this user`)
    }
    return user
  }
}
