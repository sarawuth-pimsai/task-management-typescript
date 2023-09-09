import DeleteTaskRepository from '@application/port/repository/task/delete-task.repository'
import { Task } from '@domain/entity/task'

export type DeleteTaskMemoryConfig = {
  tasks: Task[]
}
export default class DeleteTaskMemory implements DeleteTaskRepository {
  tasks: Task[]
  constructor(config: DeleteTaskMemoryConfig) {
    this.tasks = config.tasks
  }
  async deleteTask(taskId: string): Promise<boolean> {
    const tasks: Task[] = this.tasks.filter((task) => task.id !== taskId)
    this.tasks = [...tasks]
    return true
  }
}
