import jwt from 'jsonwebtoken'

export const decode = <Payload = any>(token: string) => {
  return jwt.decode(token) as Payload
}
