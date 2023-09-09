import { TaskFilter, Task } from '@domain/entity/task'
import GetTasksUseCase from '@domain/use-case/task/get-tasks.use-case'

export default class GetTasksService implements GetTasksUseCase {
  getTasks(filter: TaskFilter): Promise<Task[]> {
    throw new Error('Method not implemented.')
  }
}
