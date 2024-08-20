'use client'

import accountService from '@/services/account-service'
import { ProfileTypes } from '@/types/user'
import { ReactNode, createContext, useContext, useState } from 'react'

const AuthContext = createContext({
  profile: {},
  handleGetProfile: () => {}
})

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context)
    throw new Error('useAuthContext must be used within an AuthProvider')
  return context
}

type AuthProviderProps = {
  children: ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [profile, setProfile] = useState<ProfileTypes | {}>({})

  // Handle Login

  // Handle Register

  // Handle Get Profile
  const handleGetProfile = async () => {
    try {
      const profile = (await accountService.getProfileClient()) as ProfileTypes
      setProfile(profile)
    } catch (error) {
      console.log('🚀error---->', error)
    }
  }

  return (
    <AuthContext.Provider value={{ handleGetProfile, profile }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
