'use server'

import { authOptions } from '@/config/auth-options'
import commentService from '@/services/user/comment-service'
import { CommenterTypes, IAddComment, IComment } from '@/types/comment-type'
import { getServerSession } from 'next-auth'
import { revalidateTag } from 'next/cache'

export const addCommentAction = async (data: IAddComment) => {
  const session = await getServerSession(authOptions)
  const { id, email, firstName, lastName, photo } = session?.user || {}
  const accessToken = session?.token
  const commenter = {
    id,
    email,
    firstName,
    lastName,
    photo
  } as CommenterTypes

  // PAYLOAD DATA
  const payload = { ...data, commenter }

  // CALL API FROM SERVER NESTJS
  try {
    const res = (await commentService.addComment(
      accessToken as string,
      payload
    )) as IComment
    if (res.id) {
      return res
    }
  } catch (error) {
    throw error
  }
}
