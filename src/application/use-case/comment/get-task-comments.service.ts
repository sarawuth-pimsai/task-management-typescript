import { Comment } from '@domain/entity/comment'
import GetTaskCommnetsUseCase from '@domain/use-case/comment/get-task-comments.use-case'

export default class GetTaskCommentsService implements GetTaskCommnetsUseCase {
  getTaskComments(taskId: string): Promise<Comment[]> {
    throw new Error('Method not implemented.')
  }
}
