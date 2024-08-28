import envConfig from '@/config/environment'
import HTTP_STATUS_CODES from '@/constants/http-status-codes'
import { RequestCustomOptions } from '@/types/http-type'

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

  if (res.status === HTTP_STATUS_CODES.NO_CONTENT.statusCode) {
    return {
      statusCode: 204,
      message: 'Success'
    }
  }

  return (await res.json()) as Response
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
  patch<Response>(
    url: string,
    body: any,
    options?: Omit<RequestCustomOptions, 'body'>
  ) {
    return request<Response>('PATCH', url, { ...options, body })
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
