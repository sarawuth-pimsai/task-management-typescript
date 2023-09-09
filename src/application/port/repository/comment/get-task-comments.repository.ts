import { Comment } from '@domain/entity/comment'

export default interface GetTaskCommentsRepository {
  getTaskComments(taskId: string): Promise<Comment[]>
}
