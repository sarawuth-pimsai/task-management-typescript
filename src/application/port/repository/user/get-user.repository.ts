import { User } from '@domain/entity/user'

export default interface GetUserRepository {
  getUser(userId: string): Promise<User | undefined>
}
