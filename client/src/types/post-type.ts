import { IBase } from '@/types/base-type'
import { IUser } from '@/types/user-type'

export interface IPost extends IBase {
  id: string
  content: string
  photo?: string
  poster: Pick<IUser, 'id' | 'email' | 'firstName' | 'lastName' | 'photo'>
}

export interface ICreatePostPayload {
  poster: Pick<IUser, 'id' | 'email' | 'firstName' | 'lastName' | 'photo'>
  content: string
  photo?: string
}

export interface IEditPostPayload {
  content?: string
  photo?: string
}
