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
  },
  getAllFollowers(userId: string, accessToken: string, query?: any) {
    return http.get(`/users/all-followers${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  },
  getAllFollowings(userId: string, accessToken: string, query?: any) {
    return http.get(`/users/all-followings${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  },
  addFriend(accessToken: string, payload: any) {
    return http.post(`/users/add-friend`, payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  }
}

export default userService
