import { IUser } from '@/types/user-type'

export interface ILoginPayload {
  email: string | undefined
  password: string | undefined
}

export interface ILoginResponse {
  status?: number
  errors?: any
  refreshToken: string
  token: string
  tokenExpires: Date
  user: IUser
}

export interface IRegisterPayload {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface IEmailConfirmPayload {
  hash: string
}
