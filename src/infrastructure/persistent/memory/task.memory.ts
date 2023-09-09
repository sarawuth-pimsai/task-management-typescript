import DeleteTaskRepository from '@application/port/repository/task/delete-task.repository'
import GetTaskRepository from '@application/port/repository/task/get-task.repository'
import GetTasksRepository from '@application/port/repository/task/get-tasks.repository'
import UpdateTaskStatusRepository from '@application/port/repository/task/update-task-status.repository'
import { Task, TaskFilter, TaskStatus } from '@domain/entity/task'

export type TaskMemoryConfig = {
  tasks: Task[]
}
export default class TaskMemory
  implements
    DeleteTaskRepository,
    GetTaskRepository,
    GetTasksRepository,
    UpdateTaskStatusRepository
{
  private tasks: Task[]
  constructor(config: TaskMemoryConfig) {
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
  async getTask(taskId: string): Promise<Task | undefined> {
    let task: Task | undefined = undefined
    const result = this.tasks.filter((task) => task.id === taskId)
    if (result.length > 0) {
      task = { ...result[0] }
    }
    return task
  }
  async deleteTask(taskId: string): Promise<boolean> {
    const tasks: Task[] = this.tasks.filter((task) => task.id !== taskId)
    this.tasks = [...tasks]
    return true
  }
}
