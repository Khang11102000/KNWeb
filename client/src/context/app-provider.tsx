'use client'

import { clientToken } from '@/utils/http'
import { ReactNode, useEffect, useState } from 'react'

type AppProviderProps = {
  children: ReactNode
  initialToken?: string
}

const AppProvider = ({ children, initialToken }: AppProviderProps) => {
  useState(() => {
    if (typeof window !== 'undefined') {
      clientToken.value = initialToken ?? ''
    }
  })

  return <>{children}</>
}

export default AppProvider
