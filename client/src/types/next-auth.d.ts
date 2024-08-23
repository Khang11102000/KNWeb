import { IUser } from '@/types/user-type'

declare module 'next-auth/jwt' {
  interface JWT {
    access_token: string
    refresh_token: string
    user: IUser
    access_expire: number
    error: string
  }
}

declare module 'next-auth' {
  interface Session {
    user: IUser
    access_token: string
    refresh_token: string
    access_expire: number
    error: string
  }
}
