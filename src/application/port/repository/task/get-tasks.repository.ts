import { Task, TaskFilter } from '@domain/entity/task'

export default interface GetTasksRepository {
  getTasks(filter: TaskFilter): Promise<Task[]>
}
