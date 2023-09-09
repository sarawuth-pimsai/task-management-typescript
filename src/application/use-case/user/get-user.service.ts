import { User } from '@domain/entity/user'
import GetUserUseCase from '@domain/use-case/user/get-user.use-case'

export default class GetUserService implements GetUserUseCase {
  getUser(userId: string): Promise<User> {
    throw new Error('Method not implemented.')
  }
}
