import GetTasksRepository from '@application/port/repository/task/get-tasks.repository'
import config from '@configs/config'
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
  async getTasks(filter?: TaskFilter): Promise<Task[]> {
    const defaultFilter: TaskFilter = {
      page: 1,
      limit: config.application.rest.limitPerPage,
    }
    filter = { ...defaultFilter, ...filter }
    let tasks: Task[] = []
    tasks = await this.getTasksRepo.getTasks(filter)
    return tasks
  }
}
