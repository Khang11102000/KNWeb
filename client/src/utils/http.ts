import envConfig from '@/config/environment'
import {
  FORBIDDEN_ERROR_STATUS,
  UNAUTHORIZE_ERROR_STATUS
} from '@/constants/statusCode'
import { TokenTypes } from '@/types/auth'
import { redirect } from 'next/navigation'

class HttpError extends Error {
  status: number
  data: any
  constructor({ status, data }: { status: number; data: any }) {
    super('Http Error')
    this.status = status
    this.data = data
  }
}

class Token {
  private token = ''

  get value() {
    return this.token
  }

  set value(token: string) {
    if (typeof window === 'undefined') {
      throw new Error('Cannot set access token on server side.')
    }
    this.token = token
  }
}

export const clientToken = new Token()

type CustomOptionsType = RequestInit & {
  baseUrl?: string
}

const request = async <Response>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  options?: CustomOptionsType | undefined
) => {
  // If baseUrl is string empty same call to Next Server
  const baseUrl =
    options?.baseUrl === undefined
      ? envConfig.NEXT_PUBLIC_API_ENDPOINT
      : options.baseUrl
  const body = options?.body ? JSON.stringify(options.body) : undefined
  const token: TokenTypes = clientToken.value && JSON.parse(clientToken.value)
  const { accessToken } = token

  const baseHeaders = {
    'Content-Type': 'application/json',
    Authorization: accessToken ? `Bearer ${accessToken}` : ''
  }

  // Fetching data
  const fullURL = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`

  const res = await fetch(fullURL, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers
    },
    method,
    body
  })

  const data: Response = await res.json()
  const status = res.status

  // Failed
  if (!res.ok) {
    // Handle interceptor token expired error
    // Unauthorize error
    if (res.status === UNAUTHORIZE_ERROR_STATUS) {
      // Auto logout from client
      if (typeof window !== 'undefined') {
        try {
          const logoutFromNextClientToNextServerRes = await fetch(
            '/api/auth/logout',
            {
              headers: {
                ...baseHeaders
              }
            }
          )

          const data = await logoutFromNextClientToNextServerRes.json()

          if (!logoutFromNextClientToNextServerRes.ok) {
            throw new HttpError({
              status: logoutFromNextClientToNextServerRes.status,
              data
            })
          }

          clientToken.value = ''
          // location.href = '/login'
        } catch (error: any) {
          throw new HttpError({ status: error.status, data: error.message })
        }
      } else {
        // Auto logout from server
        const accessToken = (options?.headers as any)?.Authorization?.split(
          ' '
        )?.[1]

        // Redirect to logout page to clear cookie
        redirect(`/logout?accessToken=${accessToken}`)
      }
    }

    // Permission error
    if (res.status === FORBIDDEN_ERROR_STATUS) {
      if (typeof window !== 'undefined') {
        location.href = '/permission-denied'
      } else {
        redirect('/permission-denied')
      }
    }

    throw new HttpError({ status, data })
  }

  // Success
  return data
}

const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptionsType, 'body'> | undefined
  ) {
    return request<Response>('GET', url, options)
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptionsType, 'body'> | undefined
  ) {
    return request<Response>('POST', url, { ...options, body })
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptionsType, 'body'> | undefined
  ) {
    return request<Response>('PUT', url, { ...options, body })
  },
  delete<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptionsType, 'body'> | undefined
  ) {
    return request<Response>('DELETE', url, { ...options, body })
  }
}

export default http
