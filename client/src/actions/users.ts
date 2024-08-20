'use server'

import { CREATED_SUCCESS_STATUS, OK_STATUS } from '@/constants/statusCode'
import accountService from '@/services/account-service'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

// Get access token from cookie
const cookieStore = cookies()
const token = cookieStore.get('token')?.value || ''
const { accessToken } = JSON.parse(token)

// Add new user
export const addNewUserAction = async (data: any) => {
  try {
    const res = await accountService.addNewUser(data, accessToken)
    if (res.statusCode === CREATED_SUCCESS_STATUS) {
      revalidateTag('list-users')
      return res
    }
  } catch (error) {
    throw error
  }
}

// Delete user
export const deleteUserAction = async (id: number) => {
  const payload = { userId: id }
  try {
    const res = await accountService.deleteUser(payload, accessToken)
    if (res.statusCode === OK_STATUS) {
      revalidateTag('list-users')
      return res
    }
  } catch (error) {
    throw error
  }
}
