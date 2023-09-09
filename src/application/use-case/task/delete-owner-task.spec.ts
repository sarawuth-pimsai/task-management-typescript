import { faker } from '@faker-js/faker'
import { Task, TaskStatus } from '@domain/entity/task'
import TaskMemory, { TaskMemoryConfig } from '@persistent/memory/task.memory'
import InvalidParamsError from '@errors/invalid-params.error'
import ForbiddenError from '@errors/forbidden.error'
import NotFoundError from '@errors/not-found.error'
import DeleteOwnerTaskService, {
  DeleteOwnerTaskServiceContext,
} from './delete-owner-task.service'
import UserMemory, { UserMemoryConfig } from '@persistent/memory/user.memory'

describe('Delete Owner Task', () => {
  let ownerId: string
  let taskIDs: string[]
  let tasks: Task[]
  let service: DeleteOwnerTaskService

  function createTasks(ownerId: string, no: number): Task[] {
    let otherUserId: string = faker.string.uuid()
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
        userId: faker.helpers.arrayElement([otherUserId, ownerId]),
        created: faker.date.anytime(),
      }
      tasks.push(task)
    }
    return tasks
  }

  function createDeleteOwnerTaskServiceContext(tasks: Task[]) {
    const taskMemoryConfig: TaskMemoryConfig = {
      tasks,
    }
    const taskMemory: TaskMemory = new TaskMemory(taskMemoryConfig)
    const userMemoryConfig: UserMemoryConfig = {
      users: [{ id: ownerId, displayName: faker.person.fullName() }],
    }
    const userMemory: UserMemory = new UserMemory(userMemoryConfig)
    const deleteOwnerTaskServiceContext: DeleteOwnerTaskServiceContext = {
      deleteTaskRepo: taskMemory,
      getTaskRepo: taskMemory,
      getUserRepo: userMemory,
    }
    return { deleteOwnerTaskServiceContext }
  }

  beforeAll(() => {
    ownerId = faker.string.uuid()
    tasks = createTasks(ownerId, 10)
    taskIDs = tasks.map((task) => task.id)
    const context = createDeleteOwnerTaskServiceContext(tasks)
    service = new DeleteOwnerTaskService(context.deleteOwnerTaskServiceContext)
  })

  afterAll(() => {
    ownerId = ''
    tasks = []
    taskIDs = []
  })

  it('should return throw execption invalid track id', () => {
    const userIDs: string[] = tasks.map((task) => task.userId)
    const userId: string = userIDs[0]
    expect(async () => {
      await service.deleteOwnerTask(userId, '')
    }).rejects.toThrow(InvalidParamsError)
  })

  it(`should return throw execption invalid user id`, () => {
    const taskId: string = taskIDs[0]
    expect(async () => {
      await service.deleteOwnerTask('', taskId)
    }).rejects.toThrow(InvalidParamsError)
  })

  it(`should return throw don't have permition`, () => {
    const notUserTasks: Task[] = tasks.filter((task) => task.userId !== ownerId)
    const notUserTaskIDs: string[] = notUserTasks.map((task) => task.id)
    const taskId: string = notUserTaskIDs[0]
    expect(async () => {
      await service.deleteOwnerTask(ownerId, taskId)
    }).rejects.toThrow(ForbiddenError)
  })

  it(`should can't found task id`, () => {
    const userIDs: string[] = tasks.map((task) => task.userId)
    const userId: string = userIDs[0]
    const taskId: string = faker.string.uuid()
    expect(async () => {
      await service.deleteOwnerTask(userId, taskId)
    }).rejects.toThrow(NotFoundError)
  })

  it(`should return success`, async () => {
    const ownerTasks: Task[] = tasks.filter((task) => task.userId === ownerId)
    const deleteTask: Task = ownerTasks[0]
    const { id, userId } = deleteTask
    const expectResult: boolean = true
    const result: boolean = await service.deleteOwnerTask(userId, id)

    expect(result).toBe(expectResult)
  })
})
