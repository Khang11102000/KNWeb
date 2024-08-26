'use client'
import { ADMIN_ROLE } from '@/constants/role'
import { PUBLIC_ROUTES } from '@/constants/routes'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const useAuthenticated = () => {
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'loading') return
    if (session) {
      router.push(PUBLIC_ROUTES.HOME)
    }
  }, [session, status, router])

  return { session, status }
}

export default useAuthenticated
