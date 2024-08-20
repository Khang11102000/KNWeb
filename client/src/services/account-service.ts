import { RegisterBodyType, RegisterResType } from '@/types/auth'
import {
  DeleteUserResTypes,
  DeleteUserTypes,
  GetUserByIdTypes,
  UserTypes
} from '@/types/user'
import http from '@/utils/http'

const accountService = {
  getProfile(accessToken?: string) {
    return http.get('/user/view', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  },
  getProfileClient() {
    return http.get('/user/view')
  },
  getUsers(accessToken?: string, query: string = '') {
    return http.get<UserTypes>(`/user/view-all${query}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      next: {
        tags: ['list-users']
      }
    })
  },
  // getUserById(accessToken: string, payload: GetUserByIdTypes) {
  //   return http.get<UserTypes>('/user/view-detail', payload, {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`
  //     }
  //   })
  // },
  addNewUser(payload: RegisterBodyType, accessToken: string) {
    return http.post<RegisterResType>('/user/add', payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  },
  deleteUser(payload: DeleteUserTypes, accessToken: string) {
    return http.delete<DeleteUserResTypes>('/user/delete', payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  }
}

export default accountService
