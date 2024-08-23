import { ILoginPayload, ILoginResponse } from '@/types/auth-type'
import http from '@/utils/http'

const authService = {
  loginByEmail(payload: ILoginPayload) {
    return http.post<ILoginResponse>('/auth/email/login', payload)
  },
  logout(accessToken: string) {
    return http.post(
      '/auth/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
  }
}

export default authService
