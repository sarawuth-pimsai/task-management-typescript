import { User } from '@domain/entity/user'

export default interface GetUserUseCase {
  getUser(userId: string): Promise<User | undefined>
}
