import UpdateOwnerTaskStatusUseCase from '@domain/use-case/task/update-owner-task-status.use-case'

export default class UpdateOwnerTaskStatusService
  implements UpdateOwnerTaskStatusUseCase
{
  updateOwnerTaskStatus(taskId: string, status: 'TODO'): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}
