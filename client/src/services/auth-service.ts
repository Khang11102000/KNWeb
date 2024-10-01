import {
  IEmailConfirmPayload,
  ILoginPayload,
  ILoginResponse,
  IRegisterPayload
} from '@/types/auth-type'
import { IUser } from '@/types/user-type'
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
  },
  register(payload: IRegisterPayload) {
    return http.post<any>('/auth/email/register', payload)
  },
  confirmEmail(payload: IEmailConfirmPayload) {
    return http.post<any>('/auth/email/confirm', payload)
  },
  getMe(accessToken: string) {
    return http.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      next: {
        tags: ['me']
      }
    })
  },
  updateMe(accessToken: string, payload: IUser) {
    return http.patch<IUser>('/auth/me', payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  }
}

export default authService
