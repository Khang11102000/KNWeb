import { ILoginResponse } from '@/types/auth-type'
import { IUser } from '@/types/user-type'
import { DefaultSession, DefaultUser } from 'next-auth'

declare module 'next-auth/jwt' {
  interface JWT {
    refreshToken: string
    token: string
    tokenExpires: number
    user: IUser
  }
}

declare module 'next-auth' {
  interface User {
    refreshToken: string
    token: string
    tokenExpires: number
    user: IUser & DefaultUser
  }
  interface Session {
    refreshToken: string
    token: string
    tokenExpires: number
    user: IUser & DefaultSession['user']
  }
}
