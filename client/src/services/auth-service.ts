import {
  LoginBodyType,
  LoginResType,
  RefreshTokenResTypes,
  RegisterBodyType,
  RegisterResType,
  TokenTypes
} from '@/types/auth'
import http from '@/utils/http'

const authService = {
  login(payload: LoginBodyType) {
    return http.post<LoginResType>('/auth/login', payload)
  },
  register(payload: RegisterBodyType) {
    return http.post<RegisterResType>('/auth/register', payload)
  },
  authFromNextServer(payload: TokenTypes) {
    return http.post('/api/auth', payload, {
      baseUrl: ''
    })
  },
  logoutFromNextClientToNextServer() {
    return http.get('/api/auth/logout', {
      baseUrl: ''
    })
  },
  refreshToken(payload: { refreshToken: string }) {
    return http.post<RefreshTokenResTypes>('/auth/refresh-token', payload)
  }
}

export default authService
