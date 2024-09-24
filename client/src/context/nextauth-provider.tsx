'use client'
import { message } from 'antd'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

const NextAuthProvider = ({ children }: { children: ReactNode }) => {
  message.config({
    top: 50,
    duration: 2,
    maxCount: 3,
    rtl: false
  })

  return <SessionProvider>{children}</SessionProvider>
}

export default NextAuthProvider
