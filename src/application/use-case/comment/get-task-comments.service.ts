import GetTaskCommentsRepository from '@application/port/repository/comment/get-task-comments.repository'
import { Comment } from '@domain/entity/comment'
import GetTaskCommnetsUseCase from '@domain/use-case/comment/get-task-comments.use-case'
import InvalidParamsError from '@errors/invalid-params.error'

export type GetTaskCommentsServiceContext = {
  getTaskCommentsRepo: GetTaskCommentsRepository
}
export default class GetTaskCommentsService implements GetTaskCommnetsUseCase {
  readonly getTaskCommentsRepo: GetTaskCommentsRepository
  constructor(context: GetTaskCommentsServiceContext) {
    this.getTaskCommentsRepo = context.getTaskCommentsRepo
  }
  private validateTaskId(taskId: string): boolean {
    const regex = new RegExp(
      /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/,
      'i'
    )
    if (!taskId || !regex.test(taskId)) {
      throw new InvalidParamsError(`Please check task id`)
    }
    return true
  }
  async getTaskComments(taskId: string): Promise<Comment[]> {
    this.validateTaskId(taskId)
    let comments: Comment[] = []
    comments = await this.getTaskCommentsRepo.getTaskComments(taskId)
    return comments
  }
}
