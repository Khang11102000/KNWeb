'use client'

import authService from '@/services/auth-service'
import { clientToken } from '@/utils/http'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const LogoutPage = () => {
  const searchParams = useSearchParams()
  const accessToken = searchParams.get('accessToken')
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const res: any = await authService.logoutFromNextClientToNextServer()
        toast.success(res?.message || 'Logout is successfully. Please login.')
        router.push(`/login?logoutFrom=${pathname}`)
      } catch (error: any) {
        toast(error?.message)
      }
    }

    const token = clientToken.value && JSON.parse(clientToken.value)
    if (accessToken === token?.accessToken) {
      handleLogout()
    }
  }, [accessToken, router, pathname])
  return <></>
}

export default LogoutPage
