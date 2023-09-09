import GetTaskRepository from '@application/port/repository/task/get-task.repository'
import { Task } from '@domain/entity/task'

export type GetTaskMemoryConfig = {
  tasks: Task[]
}
export default class GetTaskMemory implements GetTaskRepository {
  private readonly tasks: Task[]
  constructor(config: GetTaskMemoryConfig) {
    this.tasks = config.tasks
  }
  async getTask(taskId: string): Promise<Task | undefined> {
    let task: Task | undefined = undefined
    const result = this.tasks.filter((task) => task.id === taskId)
    if (result.length > 0) {
      task = { ...result[0] }
    }
    return task
  }
}
