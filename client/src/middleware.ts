import envConfig from '@/config/environment'
import { ADMIN_ROLE, USER_ROLE } from '@/constants/role'
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

const ADMIN_PATHS = [
  '/admin/dashboard',
  '/admin/users',
  '/admin/posts',
  '/admin/profile'
]

const USER_PATHS = [
  '/',
  '/me',
  '/profile/:path*',
  '/search/posts',
  '/search/users'
]

// const PUBLIC_PATHS = ['/login', '/register']

export default withAuth(
  async function middleware(request: NextRequestWithAuth) {
    if (
      (ADMIN_PATHS.some((path) => path === request.nextUrl.pathname) &&
        request.nextauth.token?.user.role.id !== ADMIN_ROLE.code) ||
      (USER_PATHS.some((path) => path === request.nextUrl.pathname) &&
        request.nextauth.token?.user.role.id !== USER_ROLE.code)
    ) {
      return NextResponse.redirect(new URL('/permission-denied', request.url))
    }

    if (
      USER_PATHS.some((path) => path === request.nextUrl.pathname) &&
      !request.nextauth.token?.token
    ) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token
      }
    },
    secret: envConfig.NEXT_PUBLIC_NEXTAUTH_SECRET
  }
)

export const config = {
  matcher: [
    '/',
    '/admin/dashboard',
    '/admin/users',
    '/admin/posts',
    '/admin/profile',
    '/me',
    '/profile/:path*',
    '/search/posts',
    '/search/users'
  ]
}
