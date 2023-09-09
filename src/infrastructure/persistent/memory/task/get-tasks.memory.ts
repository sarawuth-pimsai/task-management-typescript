import GetTasksRepository from '@application/port/repository/task/get-tasks.repository'
import { TaskFilter, Task } from '@domain/entity/task'

export type GetTasksMemoryConfig = {
  tasks: Task[]
}
export default class GetTasksMemory implements GetTasksRepository {
  private readonly tasks: Task[]
  constructor(config: GetTasksMemoryConfig) {
    this.tasks = config.tasks
  }
  async getTasks(filter?: Partial<TaskFilter>): Promise<Task[]> {
    let tasks: Task[] = []
    // const page: number = filter?.page ?? 1
    // const limit: number = filter?.limit ?? 100
    const status = filter?.status
    if (status) {
      tasks = this.tasks.filter((task) => task.status === status)
    }
    return tasks
  }
}
