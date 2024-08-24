import { ADMIN_ROLE, USER_ROLE } from '@/constants/role'
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '@/constants/routes'
import { notification } from 'antd'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const useAuthenticated = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return
    if (session && session.user.role.id === ADMIN_ROLE.code) {
      router.push(PRIVATE_ROUTES.ADMIN.DASHBOARD)
    } else if (session && session.user.role.id === USER_ROLE.code) {
      router.push(PUBLIC_ROUTES.HOME)
    } else {
      router.push(PUBLIC_ROUTES.LOGIN)
    }
  }, [session, status, router])

  return { session, status }
}

export default useAuthenticated
