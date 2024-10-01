import { ISearchParams } from '@/types/base-type'
import { ICreatePostPayload, IEditPostPayload, IPost } from '@/types/post-type'
import http from '@/utils/http'

const postService = {
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
    return http.delete(`/posts/${postId}`, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  },
  getPostsByKeyword(
    accessToken: string,
    keyword: string
    // userId?: string,
    // query?: ISearchParams
  ) {
    return http.get(`/posts/key/${keyword}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  }
}

export default postService
