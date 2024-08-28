import { ReactNode } from 'react'
import AuthPublicLayout from '@/app/(auth)/auth-public-layout'

const AuthLayout = async ({ children }: Readonly<{ children: ReactNode }>) => {
  return <AuthPublicLayout>{children}</AuthPublicLayout>
}

export default AuthLayout
