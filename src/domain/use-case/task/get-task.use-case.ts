import { Task } from '@domain/entity/task'

export default interface GetTaskUseCase {
  getTask(taskId: string): Promise<Task>
}
