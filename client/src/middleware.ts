import { groupRoles } from '@/constants/roles'
import { PayloadJWTTypes, TokenTypes } from '@/types/auth'
import { decode } from '@/utils/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const userPrivatePaths = ['/me']
const publicPaths = ['/login', '/register']
const adminPaths = ['/admin/dashboard', '/admin/users', '/admin/users/add']

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('token')?.value

  if (
    !token &&
    (userPrivatePaths.includes(pathname) || adminPaths.includes(pathname))
  ) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (token && publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Get role from token
  const tokenObj: TokenTypes = token && JSON.parse(token)
  const payloadJWT = decode<PayloadJWTTypes>(tokenObj?.accessToken)
  const role = payloadJWT?.group?.name
  const isCustomer = role === groupRoles.CUSTOMER

  // Check role
  if (isCustomer && adminPaths.some((path) => path === pathname)) {
    return NextResponse.redirect(new URL('/permission-denied', request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/me',
    '/login',
    '/register',
    '/admin/dashboard',
    '/admin/users',
    '/admin/users/add'
  ]
}
