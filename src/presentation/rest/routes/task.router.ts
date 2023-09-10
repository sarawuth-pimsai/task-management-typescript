import DeleteTaskHandler from '@rest/handlers/task/delete-task.handler'
import GetTaskCommentsHandler from '@rest/handlers/task/get-task-comments.handler'
import GetTaskHandler from '@rest/handlers/task/get-task.handler'
import GetTasksHandler from '@rest/handlers/task/get-tasks.handler'
import UpdateTaskStatusHandler from '@rest/handlers/task/update-task-status.handler'
import { Router } from 'express'
import expressAsyncHandler from 'express-async-handler'

export default class TaskRouter {
  static initial(): Router {
    const router: Router = Router()
    router.get(
      '/:taskId/comments',
      expressAsyncHandler(GetTaskCommentsHandler.getTaskComments)
    )
    router.put(
      '/:taskId/status',
      expressAsyncHandler(UpdateTaskStatusHandler.updateTaskStatus)
    )
    router.get('/:taskId', expressAsyncHandler(GetTaskHandler.getTask))
    router.delete('/:taskId', expressAsyncHandler(DeleteTaskHandler.deleteTask))
    router.get('', expressAsyncHandler(GetTasksHandler.getTasks))

    return router
  }
}
