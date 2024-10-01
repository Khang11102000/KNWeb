'use server'
import { authOptions } from '@/config/auth-options'
import authService from '@/services/auth-service'
import { IUser } from '@/types/user-type'
import { getServerSession } from 'next-auth'
import { revalidateTag } from 'next/cache'

export async function updateMe(payload: IUser) {
  const session = await getServerSession(authOptions)

  if (session?.token) {
    try {
      const res = await authService.updateMe(session.token, payload)
      revalidateTag('me')
      return res
    } catch (error) {
      throw error
    }
  }
}
