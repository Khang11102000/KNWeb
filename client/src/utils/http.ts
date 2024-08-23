import envConfig from '@/config/environment'
import { RequestCustomOptions } from '@/types/http-type'
import ApiError from '@/utils/ApiError'

const request = async <Response>(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  url: string,
  options?: RequestCustomOptions
) => {
  const baseUrl = options?.baseUrl
    ? options.baseUrl
    : envConfig.NEXT_PUBLIC_API_ENDPOINT
  const body = options?.body ? JSON.stringify(options.body) : undefined
  const baseHeaders = {
    'Content-Type': 'application/json'
  }

  const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`

  // Fetch Data
  const res = await fetch(fullUrl, {
    method,
    body,
    headers: {
      ...baseHeaders,
      ...options?.headers
    }
  })

  // Data Response From Server
  const data: Response = await res.json()

  // Fetch Data Failed
  // if (!res.ok) {
  //   throw new ApiError({ status: res.status, data })
  // } else {
  //   // Fetch Data Succeed
  // }
  return data
}

const http = {
  get<Response>(url: string, options?: Omit<RequestCustomOptions, 'body'>) {
    return request<Response>('GET', url, options)
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<RequestCustomOptions, 'body'>
  ) {
    return request<Response>('POST', url, { ...options, body })
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<RequestCustomOptions, 'body'>
  ) {
    return request<Response>('PUT', url, { ...options, body })
  },
  delete<Response>(
    url: string,
    body: any,
    options?: Omit<RequestCustomOptions, 'body'>
  ) {
    return request<Response>('DELETE', url, { ...options, body })
  }
}

export default http
