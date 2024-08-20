import { ResponseBaseTypes } from '@/types/base'
import { BaseTypes } from '@/types/common'

export type UserTypes = BaseTypes & {
  id: number
  address: string
  avatar: string
  bookings: [] | null
  email: string
  groupId: number
  group: GroupTypes
  phone: string | null
  username: string
}

export type ProfileTypes = UserTypes

export type GroupTypes = {
  id: number
  description: string
  name: string
}

export type DeleteUserTypes = {
  userId: number
}

export type GetUserByIdTypes = DeleteUserTypes

export type DeleteUserResTypes = ResponseBaseTypes
