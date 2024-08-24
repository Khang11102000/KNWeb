import envConfig from '@/config/environment'
import { ADMIN_ROLE } from '@/constants/role'
import { withAuth } from 'next-auth/middleware'

const PRIVATE_PATHS = [
  '/admin/dashboard',
  '/admin/posts',
  '/admin/profile',
  '/admin/users'
]

export default withAuth(function middleware() {}, {
  callbacks: {
    authorized: ({ token, req }) => {
      if (PRIVATE_PATHS.includes(req.nextUrl.pathname)) {
        return token?.user.role.id === ADMIN_ROLE.code
      }

      return !!token
    }
  },
  secret: envConfig.NEXT_PUBLIC_NEXTAUTH_SECRET
})

export const config = {
  matcher: [
    '/admin/dashboard',
    '/admin/posts',
    '/admin/profile',
    '/admin/users'
  ]
}
