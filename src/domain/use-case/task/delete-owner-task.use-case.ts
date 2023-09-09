export default interface DeleteOwnerTaskUseCase {
  deleteOwnerTask(userId: string): Promise<boolean>
}
