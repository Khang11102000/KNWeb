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
  },
  getUsersByKeyword(accessToken: string, keyword: string) {
    return http.get(`/users/key/${keyword}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  },
  getUserById(accessToken: string, id: string) {
    return http.get(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  }
}

export default userService
