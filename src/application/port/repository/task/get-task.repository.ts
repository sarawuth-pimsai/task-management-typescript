import { Task } from '@domain/entity/task'

export default interface GetTaskRepository {
  getTask(taskId: string): Promise<Task | undefined>
}
