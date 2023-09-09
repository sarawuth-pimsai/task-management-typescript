import { faker } from '@faker-js/faker'
import { Task, TaskStatus } from '@domain/entity/task'
import TaskMemory, { TaskMemoryConfig } from '@persistent/memory/task.memory'
import InvalidParamsError from '@errors/invalid-params.error'
import ForbiddenError from '@errors/forbidden.error'
import NotFoundError from '@errors/not-found.error'
import DeleteOwnerTaskService, {
  DeleteOwnerTaskServiceContext,
} from './delete-owner-task.service'

describe('Delete Owner Task', () => {
  let taskIDs: string[]
  let tasks: Task[]
  let service: DeleteOwnerTaskService

  function createTasks(no: number): Task[] {
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
        userId: faker.string.uuid(),
        created: faker.date.anytime(),
      }
      tasks.push(task)
    }
    return tasks
  }

  function createTasksContext(tasks: Task[]) {
    const taskMemoryConfig: TaskMemoryConfig = {
      tasks,
    }
    const taskMemory: TaskMemory = new TaskMemory(taskMemoryConfig)
    const deleteOwnerTaskServiceContext: DeleteOwnerTaskServiceContext = {
      deleteTaskRepo: taskMemory,
    }
    return { deleteOwnerTaskServiceContext }
  }

  beforeAll(() => {
    tasks = createTasks(10)
    taskIDs = tasks.map((task) => task.id)
    const context = createTasksContext(tasks)
    service = new DeleteOwnerTaskService(context.deleteOwnerTaskServiceContext)
  })

  afterAll(() => {
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
    const userId: string = faker.string.uuid()
    const taskId: string = taskIDs[0]
    expect(async () => {
      await service.deleteOwnerTask(userId, taskId)
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
    const currentTask: Task = tasks[0]
    const { id, userId } = currentTask
    const expectResult: boolean = true
    const result: boolean = await service.deleteOwnerTask(userId, id)
    expect(result).toBe(expectResult)
  })
})
