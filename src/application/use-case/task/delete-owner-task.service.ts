import DeleteTaskRepository from '@application/port/repository/task/delete-task.repository'
import DeleteOwnerTaskUseCase from '@domain/use-case/task/delete-owner-task.use-case'

export type DeleteOwnerTaskServiceContext = {
  deleteTaskRepo: DeleteTaskRepository
}
export default class DeleteOwnerTaskService implements DeleteOwnerTaskUseCase {
  private readonly deleteTaskRepo: DeleteTaskRepository
  constructor(context: DeleteOwnerTaskServiceContext) {
    this.deleteTaskRepo = context.deleteTaskRepo
  }
  deleteOwnerTask(userId: string, taskId: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}
