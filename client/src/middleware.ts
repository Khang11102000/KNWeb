import envConfig from '@/config/environment'
import { ADMIN_ROLE } from '@/constants/role'
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

const ADMIN_PATHS = [
  '/admin/dashboard',
  '/admin/users',
  '/admin/posts',
  '/admin/profile'
]

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    if (
      ADMIN_PATHS.some((path) => path === req.nextUrl.pathname) &&
      req.nextauth.token?.user.role.id !== ADMIN_ROLE.code
    ) {
      return NextResponse.redirect(
        new URL('/permission-denied', req.nextUrl.origin)
      )
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
    secret: envConfig.NEXT_PUBLIC_NEXTAUTH_SECRET
  }
)

export const config = {
  matcher: [
    '/admin/dashboard',
    '/admin/users',
    '/admin/posts',
    '/admin/profile'
  ]
}
