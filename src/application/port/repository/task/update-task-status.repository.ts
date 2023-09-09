import { TaskStatus } from '@domain/entity/task'

export default interface UpdateTaskStatusRepository {
  updateTaskStatus(taskId: string, status: TaskStatus): Promise<boolean>
}
