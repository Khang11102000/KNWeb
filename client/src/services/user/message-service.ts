import { ICreatePostPayload, IEditPostPayload, IPost } from '@/types/post-type'
import http from '@/utils/http'

export type RoomType = {
  name: string,
  members: string[],
  type: string
}
export type ChatType = {
  sender_id: string,
  room_id: string,
  content: string
}
const messageService = {
  createRoom(accessToken: string, payload: RoomType) {
    return http.post('/rooms', payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  },
  getRoom(accessToken: string) {
    return http.get(`/rooms`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    })
  },
  getRoomById(accessToken: string, roomId: string) {
    return http.get(`/rooms/${roomId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    })
  },
  async getPersonalRoom(accessToken: string, friendId: string) {
    try {
      return await http.get(`/rooms/personal${friendId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
      })
    } catch (error) {
      console.log("Catch", error)
    }
    
  },
  getAllChat(accessToken: string, roomId: string) {
    return http.get(`/rooms/${roomId}/chats`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  },
  createChat(accessToken: string, data: ChatType) {
    return http.post('/rooms/createChat', data, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  },
  
}

export default messageService
