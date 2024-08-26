'use client'
import React from 'react'
import { Flex } from 'antd'
import useAuthenticated from '@/hooks/useAuthenticated'

const AuthPublicLayout = ({ children }: { children: React.ReactNode }) => {
  const { session, status } = useAuthenticated()

  if (status === 'loading') return <div>AuthLayout Loading...</div>

  if (session) return

  return (
    <Flex style={{ height: '100vh' }} align='center' justify='center'>
      {children}
    </Flex>
  )
}

export default AuthPublicLayout
