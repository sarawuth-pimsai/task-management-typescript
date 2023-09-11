import RefreshTokenHandler from '@rest/handlers/auth/refresh-token.handler'
import SigninHandler from '@rest/handlers/auth/signin.handler'
import { Router } from 'express'

export default class AuthRouter {
  static initial(): Router {
    let router: Router = Router()
    router.get('/signin/:userId', SigninHandler.signin)
    router.get('/refresh/:token', RefreshTokenHandler.refresh)
    return router
  }
}
