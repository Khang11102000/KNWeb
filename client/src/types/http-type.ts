export interface RequestCustomOptions extends RequestInit {
  baseUrl?: string
}

export interface EntityErrorResponse {
  status: 422
  errors: {
    [key: string]: string
  }
}

export interface NoContentResponse {
  statusCode: 204
  message: string
}
