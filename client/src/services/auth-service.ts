import { ILoginPayload, ILoginResponse } from '@/types/auth-type'
import http from '@/utils/http'

const authService = {
  loginByEmail(payload: ILoginPayload) {
    return http.post<ILoginResponse>('/auth/email/login', payload)
  }
}

export default authService
