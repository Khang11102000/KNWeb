import { IGetUserResponse, IUser } from '@/types/user-type'
import http from '@/utils/http'

const userService = {
  getUsers(accessToken: string) {
    return http.get<IGetUserResponse>('/users', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  }
}

export default userService
