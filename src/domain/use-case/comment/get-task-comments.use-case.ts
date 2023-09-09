import { Comment } from '@domain/entity/comment'

export default interface GetTaskCommnetsUseCase {
  getTaskComments(taskId: string): Promise<Comment[]>
}
