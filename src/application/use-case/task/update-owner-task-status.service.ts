import GetTaskRepository from '@application/port/repository/task/get-task.repository'
import UpdateTaskStatusRepository from '@application/port/repository/task/update-task-status.repository'
import GetUserRepository from '@application/port/repository/user/get-user.repository'
import { Task, TaskStatus } from '@domain/entity/task'
import { User } from '@domain/entity/user'
import UpdateOwnerTaskStatusUseCase from '@domain/use-case/task/update-owner-task-status.use-case'
import ForbiddenError from '@errors/forbidden.error'
import InvalidParamsError from '@errors/invalid-params.error'
import NotFoundError from '@errors/not-found.error'
import ValidateUtil from '@utils/validate.utils'

export type UpdateOwnerTaskStatusServiceContext = {
  getUserRepo: GetUserRepository
  getTaskRepo: GetTaskRepository
  updateTaskStatusRepo: UpdateTaskStatusRepository
}
export default class UpdateOwnerTaskStatusService
  implements UpdateOwnerTaskStatusUseCase
{
  private readonly getUserRepo: GetUserRepository
  private readonly getTaskRepo: GetTaskRepository
  private readonly updateTaskStatusRepo: UpdateTaskStatusRepository

  constructor(context: UpdateOwnerTaskStatusServiceContext) {
    this.getUserRepo = context.getUserRepo
    this.getTaskRepo = context.getTaskRepo
    this.updateTaskStatusRepo = context.updateTaskStatusRepo
  }

  async updateOwnerTaskStatus(
    userId: string,
    taskId: string,
    status: string
  ): Promise<boolean> {
    const isUserIdValid: boolean = ValidateUtil.userId(userId)
    if (isUserIdValid === false) {
      throw new InvalidParamsError(`Invalid userId.`)
    }
    const isTaskIdValid: boolean = ValidateUtil.taskId(taskId)
    if (isTaskIdValid === false) {
      throw new InvalidParamsError(`Invalid taskId`)
    }
    if (!['TODO', 'DONE', 'IN_PROGRESS'].includes(status)) {
      throw new InvalidParamsError(`Invalid status`)
    }
    const user: User | undefined = await this.getUserRepo.getUser(userId)
    const task: Task | undefined = await this.getTaskRepo.getTask(taskId)
    if (!user || !task) {
      throw new NotFoundError(`Can't found this user or this task`)
    }
    if (task.userId !== user.id) {
      throw new ForbiddenError(`Can't update task status`)
    }
    return this.updateTaskStatusRepo.updateTaskStatus(
      taskId,
      status as TaskStatus
    )
  }
}
