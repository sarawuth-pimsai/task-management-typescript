import { Comment } from '@domain/entity/comment'
import GetTaskCommnetsUseCase from '@domain/use-case/comment/get-task-comments.use-case'
import GetTaskCommentsRepository from '@application/port/repository/comment/get-task-comments.repository'
import ValidateUtil from '@utils/validate.utils'
import InvalidParamsError from '@errors/invalid-params.error'

export type GetTaskCommentsServiceContext = {
  getTaskCommentsRepo: GetTaskCommentsRepository
}
export default class GetTaskCommentsService implements GetTaskCommnetsUseCase {
  private readonly getTaskCommentsRepo: GetTaskCommentsRepository
  constructor(context: GetTaskCommentsServiceContext) {
    this.getTaskCommentsRepo = context.getTaskCommentsRepo
  }
  async getTaskComments(taskId: string): Promise<Comment[]> {
    const isValid: boolean = ValidateUtil.taskId(taskId)
    if (isValid === false) {
      throw new InvalidParamsError('Please check taskId params')
    }
    let comments: Comment[] = []
    comments = await this.getTaskCommentsRepo.getTaskComments(taskId)
    return comments
  }
}
