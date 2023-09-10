export default interface DeleteTaskCommentsRepository {
  deleteTaskComments(taskId: string): Promise<boolean>
}
