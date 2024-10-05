import envConfig from '@/config/environment'
import HTTP_STATUS_CODES from '@/constants/http-status-codes'
import { PUBLIC_ROUTES } from '@/constants/routes'
import authService from '@/services/auth-service'
import {
  ILoginPayload,
  ILoginResponse,
  IRefreshTokenResponse
} from '@/types/auth-type'
import { IUser, UserStatusEnum } from '@/types/user-type'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials) {
        if (credentials) {
          const payload = {
            email: credentials.email,
            password: credentials.password
          } as ILoginPayload

          const res = (await authService.loginByEmail(
            payload
          )) as ILoginResponse

          // Credentials Invalid Or Not Found
          if (
            res.status === HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY.statusCode &&
            Object.keys(res.errors).length > 0
          ) {
            throw new Error(JSON.stringify(res.errors))
          }

          // User Inactive
          if (res.user.status.id === UserStatusEnum.INACTIVED) {
            throw new Error(
              JSON.stringify({
                userStatus: res.user.status.id,
                message: 'Email has not been actived'
              })
            )
          }

          await authService.getMe(res.token)

          return res as any
        }
      }
    })
  ],
  secret: envConfig.NEXT_PUBLIC_NEXTAUTH_SECRET,
  pages: {
    signIn: PUBLIC_ROUTES.LOGIN
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.refreshToken = user.refreshToken
        token.token = user.token
        token.tokenExpires = user.tokenExpires
        token.user = user.user
      }

      const currentTime = Date.now()

      if (currentTime > token.tokenExpires) {
        // Access token is expired, we will refresh token
        const newToken = (await authService.refreshToken(
          token.refreshToken
        )) as IRefreshTokenResponse

        token.refreshToken = newToken.refreshToken
        token.token = newToken.token
        token.tokenExpires = newToken.tokenExpires
      }

      return token
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      if (session.user) {
        session.refreshToken = token.refreshToken
        session.token = token.token
        session.tokenExpires = token.tokenExpires
        session.user = token.user
      }
      return session
    }
  }
}
