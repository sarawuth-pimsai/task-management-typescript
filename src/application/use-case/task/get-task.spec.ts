import { faker } from '@faker-js/faker'
import { Task, TaskStatus } from '@domain/entity/task'
import GetTaskService, { GetTaskServiceContext } from './get-task.service'
import TaskMemory, { TaskMemoryConfig } from '@persistent/memory/task.memory'
import InvalidParamsError from '@errors/invalid-params.error'
import NotFoundError from '@errors/not-found.error'

describe('Get Task', () => {
  let taskId: string
  let tasks: Task[]
  let service: GetTaskService
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

  function createContext(tasks: Task[]) {
    const taskMemoryConfig: TaskMemoryConfig = {
      tasks,
    }
    const taskMemory: TaskMemory = new TaskMemory(taskMemoryConfig)
    const getTaskServiceContext: GetTaskServiceContext = {
      getTaskRepo: taskMemory,
    }
    return { getTaskServiceContext }
  }

  beforeAll(() => {
    tasks = createTasks(10)
    const taskIDs: string[] = tasks.map((task) => task.id)
    taskId = taskIDs[0]
    const context = createContext(tasks)
    service = new GetTaskService(context.getTaskServiceContext)
  })

  afterAll(() => {
    taskId = ''
    tasks = []
  })

  it('should return throw execption invalid task id', () => {
    expect(async () => {
      await service.getTask('')
    }).rejects.toThrow(InvalidParamsError)
  })

  it(`should return throw execption not found task id`, () => {
    const taskId: string = faker.string.uuid()
    expect(async () => {
      await service.getTask(taskId)
    }).rejects.toThrow(NotFoundError)
  })

  it(`should return success`, async () => {
    const expectTasks: Task[] = tasks.filter((task) => task.id === taskId)
    const expectTask: Task = expectTasks[0]
    const result: Task | undefined = await service.getTask(taskId)
    expect(result).toEqual(expectTask)
  })
})
