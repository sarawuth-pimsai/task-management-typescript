import { Task, TaskStatus } from '@domain/entity/task'
import { User } from '@domain/entity/user'
import { faker } from '@faker-js/faker'
import UpdateOwnerTaskStatusService, {
  UpdateOwnerTaskStatusServiceContext,
} from './update-owner-task-status.service'
import TaskMemory, { TaskMemoryConfig } from '@persistent/memory/task.memory'
import InvalidParamsError from '@errors/invalid-params.error'
import NotFoundError from '@errors/not-found.error'

describe('Update Owner Task Status', () => {
  let users: User[]
  let tasks: Task[]
  let userIDs: string[]
  let taskIDs: string[]

  function createTasks(userIDs: string[], no: number): Task[] {
    let tasks: Task[] = []
    for (let i: number = 0; i < no; i++) {
      const task: Task = {
        id: faker.string.uuid(),
        topic: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        status: faker.helpers.arrayElement<TaskStatus>([
          'DONE',
          'IN_PROGRESS',
          'TODO',
        ]),
        userId: faker.helpers.arrayElement(userIDs),
        created: faker.date.anytime(),
      }
      tasks.push(task)
    }
    return tasks
  }

  function createUsers(no: number): User[] {
    let users: User[] = []
    for (let i: number = 0; i < no; i++) {
      const user: User = {
        id: faker.string.uuid(),
        displayName: faker.person.fullName(),
      }
      users.push(user)
    }
    return users
  }

  function createContext(tasks: Task[]) {
    const taskmemoryConfig: TaskMemoryConfig = {
      tasks,
    }
    const taskMemory: TaskMemory = new TaskMemory(taskmemoryConfig)
    const updateOwnerTaskStatusServiceContext: UpdateOwnerTaskStatusServiceContext =
      {
        updateTaskStatusRepo: taskMemory,
      }
    return { updateOwnerTaskStatusServiceContext }
  }

  beforeAll(() => {
    users = createUsers(5)
    userIDs = users.map((user) => user.id)
    tasks = createTasks(userIDs, 50)
    taskIDs = tasks.map((task) => task.id)
  })
  afterAll(() => {
    users = []
    tasks = []
    userIDs = []
    taskIDs = []
  })

  it(`should return throw execption invalid user id`, () => {
    const userId: string = faker.string.alpha({ length: { min: 10, max: 36 } })
    const taskId: string = faker.helpers.arrayElement(taskIDs)
    const status: TaskStatus = faker.helpers.arrayElement<TaskStatus>([
      'DONE',
      'IN_PROGRESS',
      'TODO',
    ])
    const context = createContext(tasks)
    const service: UpdateOwnerTaskStatusService =
      new UpdateOwnerTaskStatusService(
        context.updateOwnerTaskStatusServiceContext
      )
    expect(async () => {
      await service.updateOwnerTaskStatus(userId, taskId, status)
    }).rejects.toThrow(InvalidParamsError)
  })

  it(`should return throw execption invalid task id`, () => {
    const userId: string = faker.helpers.arrayElement(userIDs)
    const taskId: string = faker.string.alpha({ length: { min: 10, max: 36 } })
    const context = createContext(tasks)
    const service: UpdateOwnerTaskStatusService =
      new UpdateOwnerTaskStatusService(
        context.updateOwnerTaskStatusServiceContext
      )
    expect(async () => {
      await service.updateOwnerTaskStatus(userId, taskId, 'TODO')
    }).rejects.toThrow(InvalidParamsError)
  })

  it(`should return throw execption invalid task status`, () => {
    const task: Task = faker.helpers.arrayElement<Task>(tasks)
    const userId: string = task.userId
    const taskId: string = task.id
    const status = 'TODO'
    const context = createContext(tasks)
    const service: UpdateOwnerTaskStatusService =
      new UpdateOwnerTaskStatusService(
        context.updateOwnerTaskStatusServiceContext
      )
    expect(async () => {
      await service.updateOwnerTaskStatus(userId, taskId, status)
    })
  })

  it(`should return throw execption user not found`, () => {
    const userId: string = faker.string.uuid()
    const taskId: string = faker.helpers.arrayElement(taskIDs)
    const context = createContext(tasks)
    const service: UpdateOwnerTaskStatusService =
      new UpdateOwnerTaskStatusService(
        context.updateOwnerTaskStatusServiceContext
      )
    const status: TaskStatus = faker.helpers.arrayElement<TaskStatus>([
      'DONE',
      'IN_PROGRESS',
      'TODO',
    ])
    expect(async () => {
      await service.updateOwnerTaskStatus(userId, taskId, status)
    }).rejects.toThrow(NotFoundError)
  })

  it(`should return throw execption task not found`, () => {
    const userId: string = faker.helpers.arrayElement(userIDs)
    const taskId: string = faker.string.uuid()
    const status: TaskStatus = faker.helpers.arrayElement<TaskStatus>([
      'DONE',
      'IN_PROGRESS',
      'TODO',
    ])
    const context = createContext(tasks)
    const service: UpdateOwnerTaskStatusService =
      new UpdateOwnerTaskStatusService(
        context.updateOwnerTaskStatusServiceContext
      )
    expect(async () => {
      await service.updateOwnerTaskStatus(userId, taskId, status)
    }).rejects.toThrow(NotFoundError)
  })

  it(`should return throw execption don't have permission to update status`, () => {})
  it(`should return success`, () => {})
})
