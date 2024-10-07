'use client'
import { message } from 'antd'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

const NextAuthProvider = ({ children }: { children: ReactNode }) => {
  message.config({
    top: 80,
    duration: 3,
    maxCount: 3
  })

  return <SessionProvider>{children}</SessionProvider>
}

export default NextAuthProvider
