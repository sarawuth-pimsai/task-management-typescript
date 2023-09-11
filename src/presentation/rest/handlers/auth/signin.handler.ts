import GetUserService from '@application/use-case/user/get-user.service'
import config from '@configs/config'
import { User } from '@domain/entity/user'
import DefaultError from '@errors/default.error'
import NotFoundError from '@errors/not-found.error'
import UserContext from '@rest/contexts/user.context'
import TokenUtils from '@utils/token.utils'
import { Request, Response } from 'express'

export default class SigninHandler {
  static async signin(_req: Request, res: Response) {
    const userId: string = _req.params['userId']
    const context = UserContext.create()
    const service: GetUserService = new GetUserService(
      context.getUserServiceContext
    )
    const user: User | undefined = await service.getUser(userId)
    if (!config.application.secretKey) {
      throw new DefaultError(
        'Invalid application secret key',
        500,
        '5001',
        'CONFIG_INVALID'
      )
    }
    if (!user) {
      throw new NotFoundError(`Can't not found this user`)
    }
    const accessToken: string = TokenUtils.generate(
      config.application.secretKey,
      user
    )
    res.json({ accessToken })
  }
}
