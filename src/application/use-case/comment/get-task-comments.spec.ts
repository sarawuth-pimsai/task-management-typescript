import { faker } from '@faker-js/faker'
import { Comment } from '@domain/entity/comment'
import GetTaskCommentsService, {
  GetTaskCommentsServiceContext,
} from './get-task-comments.service'
import CommentMemory, {
  CommentMemoryConfig,
} from '@persistent/memory/comment.memory'
import InvalidError from '@errors/invalid.error'

describe('Get Task Comments', () => {
  let taskIDs: string[]
  let comments: Comment[]
  let service: GetTaskCommentsService

  function createTaskComments(taskIDs: string[], no: number): Comment[] {
    let comments: Comment[] = []
    for (let i: number = 0; i < no; i++) {
      const comment: Comment = {
        id: faker.string.uuid(),
        description: faker.lorem.sentence(),
        taskId: faker.helpers.arrayElement(taskIDs),
        userId: faker.string.uuid(),
        created: faker.date.anytime(),
      }
      comments.push(comment)
    }
    return comments
  }
  function createTaskCommentsServiceContext(comments: Comment[]) {
    const commentMemoryConfig: CommentMemoryConfig = {
      comments,
    }
    const commentMemory: CommentMemory = new CommentMemory(commentMemoryConfig)
    const getTaskCommentsServiceContext: GetTaskCommentsServiceContext = {
      getTaskCommentsRepo: commentMemory,
    }
    return { getTaskCommentsServiceContext }
  }

  beforeAll(() => {
    taskIDs = [...Array(10).keys()].map((no) => faker.string.uuid())
    comments = createTaskComments(taskIDs, 100)
    const context = createTaskCommentsServiceContext(comments)
    service = new GetTaskCommentsService(context.getTaskCommentsServiceContext)
  })

  afterAll(() => {
    taskIDs = []
    comments = []
  })

  it(`should return execption task in invalid`, async () => {
    expect(async () => {
      await service.getTaskComments('')
    }).rejects.toThrow(InvalidError)
  })

  it(`should return suceess result`, async () => {
    const taskIDs: string[] = comments.map((comment) => comment.taskId)
    const taskId: string = taskIDs[0]
    const result = await service.getTaskComments(taskId)
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          taskId,
        }),
      ])
    )
  })
})
