import RefreshTokenHandler from '@rest/handlers/auth/refresh-token.handler'
import SigninHandler from '@rest/handlers/auth/signin.handler'
import { Router } from 'express'
import expressAsyncHandler from 'express-async-handler'

export default class AuthRouter {
  static initial(): Router {
    let router: Router = Router()
    router.get('/signin/:userId', expressAsyncHandler(SigninHandler.signin))
    router.get(
      '/refresh/:token',
      expressAsyncHandler(RefreshTokenHandler.refresh)
    )
    return router
  }
}
