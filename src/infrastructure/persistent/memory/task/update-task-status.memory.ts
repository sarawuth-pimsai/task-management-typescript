import UpdateTaskStatusRepository from '@application/port/repository/task/update-task-status.repository'
import { Task, TaskStatus } from '@domain/entity/task'

export type UpdateTaskStatusMemoryConfig = {
  tasks: Task[]
}
export default class UpdateTaskStatusMemory
  implements UpdateTaskStatusRepository
{
  tasks: Task[]
  constructor(config: UpdateTaskStatusMemoryConfig) {
    this.tasks = config.tasks
  }
  async updateTaskStatus(taskId: string, status: TaskStatus): Promise<boolean> {
    const tasks: Task[] = this.tasks.map((task) => {
      if (task.id === taskId) {
        task = { ...task, status }
      }
      return task
    })
    this.tasks = [...tasks]
    return true
  }
}
