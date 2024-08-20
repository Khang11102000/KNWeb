'use client'

import authService from '@/services/auth-service'
import { PayloadJWTTypes, TokenTypes } from '@/types/auth'
import { clientToken } from '@/utils/http'
import { decode } from '@/utils/jwt'
import { differenceInHours } from 'date-fns'
import { useEffect } from 'react'

const RefreshToken = () => {
  useEffect(() => {
    const interval = setInterval(async () => {
      const token: TokenTypes =
        clientToken.value && JSON.parse(clientToken.value)
      // Decode JWT
      const payloadRefreshTokenJWT = decode<PayloadJWTTypes>(token.accessToken)
      const expiresAt = new Date(payloadRefreshTokenJWT?.exp)
      const now = new Date()

      if (differenceInHours(expiresAt, now)) {
        // Call Api refresh token to server
        try {
          const res = await authService.refreshToken({
            refreshToken: token.refreshToken
          })

          clientToken.value = JSON.stringify(res.data)

          await authService.authFromNextServer({
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken
          })
        } catch (error) {
          console.log('🚀error---->', error)
        }
      }
    }, 1000 * 60 * 60)

    return () => clearInterval(interval)
  }, [])

  return null
}

export default RefreshToken
