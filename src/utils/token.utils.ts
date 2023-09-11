import { Jwt, JwtPayload, SignOptions, sign, verify } from 'jsonwebtoken'

export default class TokenUtils {
  static generate(
    secret: string,
    payload: object,
    options?: SignOptions
  ): string {
    if (!options) {
      options = {
        expiresIn: '3m',
        algorithm: 'HS256',
      }
    }
    const accessToken: string = sign(payload, secret, options)
    return accessToken
  }
  static verfiy(token: string, secret: string) {
    const result: string | JwtPayload = verify(token, secret)
    return result
  }
}
