import { IBase } from '@/types/base-type'

export enum UserStatusEnum {
  INACTIVED = '1',
  ACTIVED = '2'
}

export interface IUser extends IBase {
  id: string
  email: string
  provider: string
  socialId: null
  firstName: string
  lastName: string
  role: {
    id: string
  }
  status: {
    id: UserStatusEnum
  }
}
