import envConfig from '@/config/environment'
import HTTP_STATUS_CODES from '@/constants/http-status-codes'
import { PUBLIC_ROUTES } from '@/constants/routes'
import authService from '@/services/auth-service'
import { ILoginPayload } from '@/types/auth-type'
import { IUser } from '@/types/user-type'
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
        const payload: ILoginPayload = {
          email: credentials?.email,
          password: credentials?.password
        }

        const user = await authService.loginByEmail(payload)

        if (
          user?.status === HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY.statusCode
        ) {
          throw new Error('Email or password invalid')
        }

        return user as any
      }
    })
  ],
  secret: envConfig.NEXTAUTH_SECRET,
  pages: {
    signIn: PUBLIC_ROUTES.LOGIN
  },
  callbacks: {
    async jwt({ token, user }) {
      // Persist the OAuth access_token to the token right after
      if (user) {
        token.user = user as IUser
      }
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.user = token.user
      return session
    }
  }
}
