import { IBase } from '@/types/base-type'
import { IUser } from '@/types/user-type'

export type CommenterTypes = Pick<
  IUser,
  'id' | 'email' | 'firstName' | 'lastName' | 'photo'
>

export interface IComment extends IBase {
  id?: string
  postId?: string
  commentId?: string
  commenter: CommenterTypes
  content: string
}

export interface IAddComment extends IComment {}
