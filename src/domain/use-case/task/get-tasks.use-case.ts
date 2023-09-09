import { Task, TaskFilter } from '@domain/entity/task'

export default interface GetTasksUseCase {
  getTasks(filter: TaskFilter): Promise<Task[]>
}
