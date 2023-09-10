import { Task, TaskFilter, TaskStatus } from '@domain/entity/task'
import { faker } from '@faker-js/faker'
import GetTasksService, { GetTasksServiceContext } from './get-tasks.service'
import TaskMemory, { TaskMemoryConfig } from '@persistent/memory/task.memory'

describe('Get Tasks', () => {
  let tasks: Task[]
  let service: GetTasksService
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
    const getTasksServiceContext: GetTasksServiceContext = {
      getTasksRepo: taskMemory,
    }
    return { getTasksServiceContext }
  }
  beforeAll(() => {
    tasks = createTasks(50)
    const context = createContext(tasks)
    service = new GetTasksService(context.getTasksServiceContext)
  })
  afterAll(() => {
    tasks = []
  })

  it('should return success', async () => {
    const expectResult: Task[] = tasks
    const result: Task[] = await service.getTasks()
    expect(result).toEqual(expectResult)
  })

  it(`should return only task status TODO`, async () => {
    const expectResult: Task[] = tasks.filter((task) => task.status === 'TODO')
    const filter: TaskFilter = {
      status: 'TODO',
    }
    const result: Task[] = await service.getTasks(filter)
    expect(result).toEqual(expectResult)
  })
})
