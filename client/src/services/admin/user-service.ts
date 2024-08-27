import { IGetUserResponse, IUser } from '@/types/user-type'
import http from '@/utils/http'

const userService = {
  getUsers(accessToken: string) {
    return http.get<IGetUserResponse>('/users', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  },
  addNewUser(accessToken: string, payload: IUser) {
    return http.post<IUser>('/users', payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      next: {
        tags: ['list-users']
      }
    })
  }
}

export default userService
