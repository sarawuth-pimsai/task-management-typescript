import GetTaskRepository from '@application/port/repository/task/get-task.repository'
import { Task } from '@domain/entity/task'
import GetTaskUseCase from '@domain/use-case/task/get-task.use-case'
import InvalidParamsError from '@errors/invalid-params.error'
import NotFoundError from '@errors/not-found.error'
import ValidateUtil from '@utils/validate.utils'

export type GetTaskServiceContext = {
  getTaskRepo: GetTaskRepository
}
export default class GetTaskService implements GetTaskUseCase {
  private readonly getTaskRepo: GetTaskRepository
  constructor(context: GetTaskServiceContext) {
    this.getTaskRepo = context.getTaskRepo
  }
  async getTask(taskId: string): Promise<Task | undefined> {
    let task: Task | undefined = undefined
    const isTaskIdValid: boolean = ValidateUtil.taskId(taskId)
    if (isTaskIdValid === false) {
      throw new InvalidParamsError(`Please check taskId params`)
    }
    task = await this.getTaskRepo.getTask(taskId)
    if (!task) {
      throw new NotFoundError(`Not found this task`)
    }
    return task
  }
}
