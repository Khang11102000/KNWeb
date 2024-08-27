import { IBase } from '@/types/base-type'

export enum UserStatusEnum {
  ACTIVED = '1',
  INACTIVED = '2'
}

export interface IUser extends IBase {
  id?: string
  email: string
  provider?: string
  photo?: string | null
  socialId?: null
  firstName: string
  lastName: string
  role: {
    id: string
  }
  status: {
    id: UserStatusEnum
  }
}

export interface IGetUserResponse {
  data: IUser[]
  hasNextPage: boolean
}

export type AddNewUserTypes = Pick<
  IUser,
  'email' | 'firstName' | 'lastName' | 'photo'
> & {
  role: string
  password: string
  status: UserStatusEnum
}
