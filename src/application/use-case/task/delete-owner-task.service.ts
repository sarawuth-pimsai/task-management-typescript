import DeleteTaskCommentsRepository from '@application/port/repository/comment/delete-task-comments.repository'
import DeleteTaskRepository from '@application/port/repository/task/delete-task.repository'
import GetTaskRepository from '@application/port/repository/task/get-task.repository'
import GetUserRepository from '@application/port/repository/user/get-user.repository'
import { Task } from '@domain/entity/task'
import { User } from '@domain/entity/user'
import DeleteOwnerTaskUseCase from '@domain/use-case/task/delete-owner-task.use-case'
import ForbiddenError from '@errors/forbidden.error'
import InvalidError from '@errors/invalid.error'
import NotFoundError from '@errors/not-found.error'
import UnauthorizedError from '@errors/unauthorized.error'
import ValidateUtil from '@utils/validate.utils'

export type DeleteOwnerTaskServiceContext = {
  deleteTaskRepo: DeleteTaskRepository
  deleteTaskComentsRepo: DeleteTaskCommentsRepository
  getTaskRepo: GetTaskRepository
  getUserRepo: GetUserRepository
}
export default class DeleteOwnerTaskService implements DeleteOwnerTaskUseCase {
  private readonly deleteTaskRepo: DeleteTaskRepository
  private readonly deleteTaskCommentsRepo: DeleteTaskCommentsRepository
  private readonly getTaskRepo: GetTaskRepository
  private readonly getUserRepo: GetUserRepository
  constructor(context: DeleteOwnerTaskServiceContext) {
    this.getTaskRepo = context.getTaskRepo
    this.getUserRepo = context.getUserRepo
    this.deleteTaskRepo = context.deleteTaskRepo
    this.deleteTaskCommentsRepo = context.deleteTaskComentsRepo
  }
  async deleteOwnerTask(userId: string, taskId: string): Promise<boolean> {
    const isUserIdValid: boolean = ValidateUtil.userId(userId)
    if (isUserIdValid === false) {
      throw new UnauthorizedError(`Unauthorized`)
    }
    const isTaskIdValid: boolean = ValidateUtil.taskId(taskId)
    if (isTaskIdValid === false) {
      throw new InvalidError(`Please check taskId params ${taskId}`)
    }
    const user: User | undefined = await this.getUserRepo.getUser(userId)
    const task: Task | undefined = await this.getTaskRepo.getTask(taskId)
    if (!user || !task) {
      throw new NotFoundError(`Not found this user or this task`)
    }
    if (task.userId !== user.id) {
      throw new ForbiddenError(`User is not owner this task`)
    }
    await this.deleteTaskRepo.deleteTask(taskId)
    await this.deleteTaskCommentsRepo.deleteTaskComments(taskId)
    return true
  }
}
