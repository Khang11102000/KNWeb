'use server'

import { authOptions } from '@/config/auth-options'
import HTTP_STATUS_CODES from '@/constants/http-status-codes'
import userService from '@/services/admin/user-service'
import { IUser } from '@/types/user-type'
import EntityError from '@/utils/EntityError'
import { getServerSession } from 'next-auth'
import { revalidateTag } from 'next/cache'

export async function addNewUserAction(data: IUser) {
  const session = await getServerSession(authOptions)

  const res = (await userService.addNewUser(
    session?.token as string,
    data
  )) as any
  if (res?.id) {
    revalidateTag('list-users')
    return res
  }

  if (
    (res?.status as any) === HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY.statusCode
  ) {
    return { status: res?.status, errors: res?.errors } as EntityError
  }
}

export const editUserAction = async (userId: string, data: IUser) => {
  const session = await getServerSession(authOptions)

  if (session) {
    const res = await userService.editUser(session.token, userId, data)
    revalidateTag('list-users')
    return res
  }
}

export const deleteUserAction = async (userId: string) => {
  const session = await getServerSession(authOptions)

  if (session) {
    const res = await userService.deleteUser(session.token, userId)
    revalidateTag('list-users')
    return res
  }
}
