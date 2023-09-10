import GetTasksRepository from '@application/port/repository/task/get-tasks.repository'
import { TaskFilter, Task } from '@domain/entity/task'
import GetTasksUseCase from '@domain/use-case/task/get-tasks.use-case'

export type GetTasksServiceContext = {
  getTasksRepo: GetTasksRepository
}
export default class GetTasksService implements GetTasksUseCase {
  private readonly getTasksRepo: GetTasksRepository
  constructor(context: GetTasksServiceContext) {
    this.getTasksRepo = context.getTasksRepo
  }
  async getTasks(filter?: Partial<TaskFilter>): Promise<Task[]> {
    let tasks: Task[] = []
    tasks = await this.getTasksRepo.getTasks(filter)
    return tasks
  }
}
