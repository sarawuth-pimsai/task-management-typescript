import GetTaskCommentsRepository from '@application/port/repository/comment/get-task-comments.repository'
import { Comment } from '@domain/entity/comment'

export type GetTaskCommentsMemoryConfig = {
  comments: Comment[]
}
export default class GetTaskCommentsMemory
  implements GetTaskCommentsRepository
{
  private readonly comments: Comment[]
  constructor(config: GetTaskCommentsMemoryConfig) {
    this.comments = config.comments
  }
  async getTaskComments(taskId: string): Promise<Comment[]> {
    return this.comments.filter((comment) => comment.taskId === taskId)
  }
}
