import { TaskStatus } from '@domain/entity/task'

export default interface UpdateOwnerTaskStatusUseCase {
  updateOwnerTaskStatus(
    userId: string,
    taskId: string,
    status: string
  ): Promise<boolean>
}
