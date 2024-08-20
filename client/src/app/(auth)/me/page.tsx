import accountService from '@/services/account-service'
import { cookies } from 'next/headers'

const MeProfilePage = async () => {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value
  const { accessToken, refreshToken } = JSON.parse(
    token !== undefined ? token : ''
  )

  if (accessToken) {
    const profile = await accountService.getProfile(accessToken)
    console.log('🚀profile---->', profile)
  }

  return <div>MeProfilePage</div>
}

export default MeProfilePage
