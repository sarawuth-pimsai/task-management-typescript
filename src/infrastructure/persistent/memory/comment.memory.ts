import DeleteTaskCommentsRepository from '@application/port/repository/comment/delete-task-comments.repository'
import GetTaskCommentsRepository from '@application/port/repository/comment/get-task-comments.repository'
import { Comment } from '@domain/entity/comment'

export type CommentMemoryConfig = {
  comments: Comment[]
}
export default class CommentMemory
  implements GetTaskCommentsRepository, DeleteTaskCommentsRepository
{
  private comments: Comment[]
  constructor(config: CommentMemoryConfig) {
    this.comments = config.comments
  }
  async deleteTaskComments(taskId: string): Promise<boolean> {
    const comments = this.comments.filter(
      (comment) => comment.taskId !== taskId
    )
    this.comments = [...comments]
    return true
  }
  async getTaskComments(taskId: string): Promise<Comment[]> {
    return this.comments.filter((comment) => comment.taskId === taskId)
  }
}
