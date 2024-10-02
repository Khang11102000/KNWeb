'use client'
import { ADMIN_ROLE } from '@/constants/role'
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '@/constants/routes'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const useAuthenticated = () => {
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'loading') return
    if (session) {
      if (session.user.role.id === ADMIN_ROLE.code) {
        router.push(PRIVATE_ROUTES.ADMIN.DASHBOARD)
      } else {
        router.push(PUBLIC_ROUTES.HOME)
      }
    }
  }, [session, status, router])

  return { session, status }
}

export default useAuthenticated
