import { User } from '@domain/entity/user'
import GetUserService, { GetUserServiceContext } from './get-user.service'
import UserMemory, { UserMemoryConfig } from '@persistent/memory/user.memory'
import { faker } from '@faker-js/faker'
import InvalidParamsError from '@errors/invalid-params.error'
import NotFoundError from '@errors/not-found.error'

describe('Get User', () => {
  let users: User[]
  function createUsers(no: number): User[] {
    let users: User[] = []
    for (let i: number = 0; i < no; i++) {
      const user: User = {
        id: faker.string.uuid(),
        displayName: faker.person.fullName(),
        avatar: faker.image.avatar(),
      }
      users.push(user)
    }
    return users
  }

  function createContext(users: User[]) {
    const userMemoryConfig: UserMemoryConfig = {
      users,
    }
    const userMemory: UserMemory = new UserMemory(userMemoryConfig)
    const getUserServiceContext: GetUserServiceContext = {
      getUserRepo: userMemory,
    }
    return { getUserServiceContext }
  }
  beforeAll(() => {
    users = createUsers(30)
  })
  afterAll(() => {
    users = []
  })

  it(`should return throw execption invalid user id`, () => {
    const userId: string = faker.string.alpha({ length: { min: 10, max: 40 } })
    const context = createContext(users)
    const service: GetUserService = new GetUserService(
      context.getUserServiceContext
    )
    expect(async () => {
      await service.getUser(userId)
    }).rejects.toThrow(InvalidParamsError)
  })

  it(`should return throw execption not found this user`, () => {
    const userId: string = faker.string.uuid()
    const context = createContext(users)
    const service: GetUserService = new GetUserService(
      context.getUserServiceContext
    )
    expect(async () => {
      await service.getUser(userId)
    }).rejects.toThrow(NotFoundError)
  })

  it(`should return success`, async () => {
    const expectResult: User = faker.helpers.arrayElement<User>(users)

    const context = createContext(users)
    const service: GetUserService = new GetUserService(
      context.getUserServiceContext
    )
    const result: User | undefined = await service.getUser(expectResult.id)
    expect(result).toEqual(expectResult)
  })
})
