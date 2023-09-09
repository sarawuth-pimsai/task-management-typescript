import { TaskStatus } from '@domain/entity/task'

export default interface UpdateOwnerTaskStatusUseCase {
  updateOwnerTaskStatus(taskId: string, status: TaskStatus): Promise<boolean>
}
