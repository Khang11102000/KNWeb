'use server'

import { authOptions } from '@/config/auth-options'
import HTTP_STATUS_CODES from '@/constants/http-status-codes'
import postService from '@/services/user/post-service'
import { ICreatePostPayload, IEditPostPayload, IPost } from '@/types/post-type'
import EntityError from '@/utils/EntityError'
import { getServerSession } from 'next-auth'
import { revalidateTag } from 'next/cache'

export async function createPostAction(data: ICreatePostPayload) {
  const session = await getServerSession(authOptions)
  const accessToken = session?.token as string

  const res = (await postService.createPost(accessToken, data)) as any
  if (res?.id) {
    revalidateTag('list-posts')
    return res
  }

  if (
    (res?.status as any) === HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY.statusCode
  ) {
    return { status: res?.status, errors: res?.errors } as EntityError
  }
}

export async function editPostAction(postId: string, data: IEditPostPayload) {
  const session = await getServerSession(authOptions)
  const accessToken = session?.token as string

  const res = (await postService.editPost(accessToken, postId, data)) as IPost
  console.log('🚀res---->', res)

  if (res.id) {
    revalidateTag('list-posts')
    return res
  }
}

export async function deletePostAction(postId: string) {
  const session = await getServerSession(authOptions)
  const accessToken = session?.token as string

  const res = await postService.deletePost(accessToken, postId)
  console.log('🚀res---->', res)

  // if (res.id) {
  //   revalidateTag('list-posts')
  //   return res
  // }
}
