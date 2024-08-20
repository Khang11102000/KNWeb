import { GroupTypes } from '@/types/user'

export type RegisterBodyType = {
  email: string
  username: string
  password: string
}

export type LoginBodyType = {
  email: string
  password: string
}

export type LoginResType = {
  statusCode?: number
  message: string
  data: {
    accessToken: string
    refreshToken: string
  }
}

export type RegisterResType = {
  statusCode: number
  message: string
}

export type PayloadJWTTypes = {
  userId: number
  email?: string
  group?: GroupTypes & {
    roles: RolesTypes[]
  }
  iat: number
  exp: number
}

export type RolesTypes = {
  id: number
  url: string
  description: string
}

export type TokenTypes = {
  accessToken: string
  refreshToken: string
}

export type RefreshTokenResTypes = {
  statusCode: number
  message: string
  data: TokenTypes
}
