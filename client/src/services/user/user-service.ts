import { ICreatePostPayload, IEditPostPayload, IPost } from '@/types/post-type'
import http from '@/utils/http'

const userService = {
  createPost(accessToken: string, payload: ICreatePostPayload) {
    return http.post('/posts', payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  },
  getPostsByUser(accessToken: string, userId: string) {
    return http.get<IPost[]>(`/posts/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      next: {
        tags: ['list-posts']
      }
    })
  },
  editPost(accessToken: string, postId: string, payload: IEditPostPayload) {
    return http.patch<IPost>(`/posts/${postId}`, payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  },
  deletePost(accessToken: string, postId: string) {
    return http.delete(`/posts/${postId}`, {
      headers: {
        Authorization: `${accessToken}`
      }
    })
  }
}

export default userService
