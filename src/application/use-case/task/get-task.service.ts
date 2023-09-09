import GetTaskRepository from '@application/port/repository/task/get-task.repository'
import { Task } from '@domain/entity/task'
import GetTaskUseCase from '@domain/use-case/task/get-task.use-case'

export type GetTaskServiceContext = {
  getTaskRepo: GetTaskRepository
}
export default class GetTaskService implements GetTaskUseCase {
  private readonly getTaskRepo: GetTaskRepository
  constructor(context: GetTaskServiceContext) {
    this.getTaskRepo = context.getTaskRepo
  }
  getTask(taskId: string): Promise<Task | undefined> {
    throw new Error('Method not implemented.')
  }
}
