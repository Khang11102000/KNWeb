'use client'
import useAuthenticated from '@/hooks/useAuthenticated'
import { Flex } from 'antd'
import { ReactNode } from 'react'

const AuthLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  const { session, status } = useAuthenticated()

  if (status === 'loading') return <div>Loading...</div>

  if (session) return null

  return (
    <Flex style={{ height: '100vh' }} align='center' justify='center'>
      {children}
    </Flex>
  )
}

export default AuthLayout
