import AuthPublicLayout from '@/app/(auth)/auth-public-layout'
import { ReactNode } from 'react'

const AuthLayout = async ({ children }: Readonly<{ children: ReactNode }>) => {
  return <AuthPublicLayout>{children}</AuthPublicLayout>
}

export default AuthLayout
