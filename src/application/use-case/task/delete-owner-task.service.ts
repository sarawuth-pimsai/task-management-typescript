import DeleteOwnerTaskUseCase from '@domain/use-case/task/delete-owner-task.use-case'

export default class DeleteOwnerTaskService implements DeleteOwnerTaskUseCase {
  deleteOwnerTask(userId: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}
