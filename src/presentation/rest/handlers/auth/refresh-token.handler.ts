import config from '@configs/config'
import TokenUtils from '@utils/token.utils'
import { Request, Response } from 'express'

export default class RefreshTokenHandler {
  static refresh(_req: Request, res: Response) {
    const token: string = _req.params['token']
    TokenUtils.verfiy(token, config.application.secretKey ?? '')
    res.json({ token })
  }
}
