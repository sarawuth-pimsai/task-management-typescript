import { Task } from '@domain/entity/task'
import GetTaskUseCase from '@domain/use-case/task/get-task.use-case'

export default class GetTaskService implements GetTaskUseCase {
  getTask(taskId: string): Promise<Task> {
    throw new Error('Method not implemented.')
  }
}
