import UpdateTaskStatusRepository from '@application/port/repository/task/update-task-status.repository'
import { TaskStatus } from '@domain/entity/task'
import UpdateOwnerTaskStatusUseCase from '@domain/use-case/task/update-owner-task-status.use-case'

export type UpdateOwnerTaskStatusServiceContext = {
  updateTaskStatusRepo: UpdateTaskStatusRepository
}
export default class UpdateOwnerTaskStatusService
  implements UpdateOwnerTaskStatusUseCase
{
  private readonly updateTaskStatusRepo: UpdateTaskStatusRepository

  constructor(context: UpdateOwnerTaskStatusServiceContext) {
    this.updateTaskStatusRepo = context.updateTaskStatusRepo
  }

  async updateOwnerTaskStatus(
    userId: string,
    taskId: string,
    status: TaskStatus
  ): Promise<boolean> {
    // throw new Error('Method not implemented.')
    return true
  }
}
