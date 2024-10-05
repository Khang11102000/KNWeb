import { ReactNode } from 'react'
// import AuthPublicLayout from '@/app/(auth)/auth-public-layout'
import { Flex } from 'antd'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/config/auth-options'
import { redirect } from 'next/navigation'
import { RoleEnum } from '@/types/user-type'

const AuthLayout = async ({ children }: Readonly<{ children: ReactNode }>) => {
  const session = await getServerSession(authOptions)

  if (session && session.token) {
    if (session.user.role.id === RoleEnum.ADMIN) {
      redirect('/admin/dashboard')
    } else {
      redirect('/')
    }
  }

  return (
    <Flex style={{ height: '100vh' }} align='center' justify='center'>
      {children}
    </Flex>
  )
}

export default AuthLayout
