import http from '@/utils/http'

const userService = {
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
  },
  getAllFriend(userId: string, accessToken: string, query?: any) {
    return http.get(`/users/all-friends${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  }

}

export default userService
