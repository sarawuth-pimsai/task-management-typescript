import GetTaskCommentsRepository from '@application/port/repository/comment/get-task-comments.repository'
import { Comment } from '@domain/entity/comment'

export type CommentMemoryConfig = {
  comments: Comment[]
}
export default class CommentMemory implements GetTaskCommentsRepository {
  private readonly comments: Comment[]
  constructor(config: CommentMemoryConfig) {
    this.comments = config.comments
  }
  async getTaskComments(taskId: string): Promise<Comment[]> {
    return this.comments.filter((comment) => comment.taskId === taskId)
  }
}
