import { IAddComment, IComment } from '@/types/comment-type'
import http from '@/utils/http'

const commentService = {
  getCommentsByPostOrComment(accessToken: string, id: string) {
    return http.get<IComment[]>(`/comment/post-or-comment/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      next: {
        tags: ['list-comments']
      }
    })
  },
  addComment(accessToken: string, payload: IAddComment) {
    return http.post<IComment>('/comment', payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  }
}

export default commentService
