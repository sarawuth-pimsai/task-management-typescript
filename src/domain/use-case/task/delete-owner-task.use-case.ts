export default interface DeleteOwnerTaskUseCase {
  deleteOwnerTask(userId: string, taskId: string): Promise<boolean>
}
