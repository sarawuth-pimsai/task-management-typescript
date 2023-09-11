import { faker } from '@faker-js/faker'
import { Task, TaskStatus } from '@domain/entity/task'
import TaskMemory, { TaskMemoryConfig } from '@persistent/memory/task.memory'
import ForbiddenError from '@errors/forbidden.error'
import NotFoundError from '@errors/not-found.error'
import DeleteOwnerTaskService, {
  DeleteOwnerTaskServiceContext,
} from './delete-owner-task.service'
import UserMemory, { UserMemoryConfig } from '@persistent/memory/user.memory'
import UnauthorizedError from '@errors/unauthorized.error'
import { Comment } from '@domain/entity/comment'
import CommentMemory, {
  CommentMemoryConfig,
} from '@persistent/memory/comment.memory'
import InvalidError from '@errors/invalid.error'

describe('Delete Owner Task', () => {
  let ownerId: string
  let taskIDs: string[]
  let tasks: Task[]
  let comments: Comment[]
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

  function createTaskComments(
    userIDs: string[],
    taskIDs: string[],
    no: number
  ): Comment[] {
    let comments: Comment[] = []
    for (let i: number = 0; i < no; i++) {
      const comment: Comment = {
        id: faker.string.uuid(),
        description: faker.lorem.paragraph(),
        taskId: faker.helpers.arrayElement<string>(taskIDs),
        userId: faker.helpers.arrayElement<string>(userIDs),
        created: faker.date.anytime(),
      }
      comments.push(comment)
    }
    return comments
  }

  function createDeleteOwnerTaskServiceContext(
    tasks: Task[],
    comments: Comment[]
  ) {
    const taskMemoryConfig: TaskMemoryConfig = {
      tasks,
    }
    const taskMemory: TaskMemory = new TaskMemory(taskMemoryConfig)
    const commentMemoryConfig: CommentMemoryConfig = {
      comments,
    }
    const commentMemory: CommentMemory = new CommentMemory(commentMemoryConfig)
    const userMemoryConfig: UserMemoryConfig = {
      users: [
        {
          id: ownerId,
          displayName: faker.person.fullName(),
          avatar: faker.image.avatar(),
        },
      ],
    }
    const userMemory: UserMemory = new UserMemory(userMemoryConfig)
    const deleteOwnerTaskServiceContext: DeleteOwnerTaskServiceContext = {
      getTaskRepo: taskMemory,
      getUserRepo: userMemory,
      deleteTaskRepo: taskMemory,
      deleteTaskComentsRepo: commentMemory,
    }
    return { deleteOwnerTaskServiceContext }
  }

  beforeAll(() => {
    ownerId = faker.string.uuid()
    tasks = createTasks(ownerId, 10)
    taskIDs = tasks.map((task) => task.id)
    comments = createTaskComments([ownerId], taskIDs, 10)
    const context = createDeleteOwnerTaskServiceContext(tasks, comments)
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
    }).rejects.toThrow(InvalidError)
  })

  it(`should return throw execption unauthorized`, () => {
    const taskId: string = taskIDs[0]
    expect(async () => {
      await service.deleteOwnerTask('', taskId)
    }).rejects.toThrow(UnauthorizedError)
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
