'use client'
import UserCard from '@/app/(user)/_components/user-card'
import SkeletonUser from '@/components/shared/skeleton-user'
import messageService from '@/services/user/message-service'
import userService from '@/services/user/user-service'
import { IUser } from '@/types/user-type'
import { Flex, Skeleton } from 'antd'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import CreateMessageModal from '../create-message-modal/index.ts'

interface IFriend {
  id: string
  name: string
}
const ListFriend = () => {
  const { data: session } = useSession()
  const userId = session?.user.id
  const [friends, setFriends] = useState<IUser[] | []>([])
  const [friend, setFriend] = useState<IFriend>({ id: "", name: "" })

  const [isLoading, setisLoading] = useState<boolean>(true)
  const [openModal, setOpenModal] = useState(false)
  const [modalInputValue, setModalInputValue] = useState("")

  const router = useRouter()

  const fetchAllFriends = useCallback(async () => {
    if (session?.token && userId) {
      try {
        const res = (await userService.getAllFriend(
          userId,
          session?.token
        )) as any
        setFriends(res?.data)
      } catch (error) {
        console.log('🚀error---->', error)
      } finally {
        setisLoading(false)
      }
    }
  }, [userId, session?.token])

  useEffect(() => {
    fetchAllFriends()
  }, [fetchAllFriends])

  const handleClickUser = (e: any, id: string, name: string, avt: string) => {
    messageService.getPersonalRoom(session?.token || "", id).then((room: any) => {
      if (room) {
        router.push(`/message/${room.id}?name=${name}&avt=${avt || ""}`);
      } else {
        setFriend({ ...friend, name: name, id: id })
        setOpenModal(true)
      }
    })
  }
  const handleOk = (e: any) => {
    if (modalInputValue.length > 0 && userId && friend.id.length > 0) {
      messageService.createRoom(session?.token || "", {
        name: '',
        members: [userId, friend.id],
        type: 'personal'
      }).then((response: any) => {
        console.log("response: ", response.id)
        if (response?.id)
          messageService.createChat(session?.token || "", {
            sender_id: userId,
            room_id: response.id,
            content: modalInputValue
          })
          router.push(`/message/${response?.id.toString()}`)
      })
    }
  }
  const handleChangeModalInput = (e: any) => {
    setModalInputValue(e.target.value)
  }
  return (
    <div style={{ width: 260 }}>
      {!isLoading &&
        friends?.length > 0 &&
        friends.map((user) => {
          return <UserCard onClick={(e) => handleClickUser(e, user.id || "", user.firstName + ' ' + user.lastName, user.photo || "")} key={user.id} user={user} />
        })}

      {isLoading &&
        friends.length === 0 &&
        Array(3)
          .fill('')
          .map((_, index) => {
            return <SkeletonUser key={index} />
          })}
      <CreateMessageModal open={openModal} userName={friend.name} inputValue={modalInputValue} onOk={handleOk} onInputChange={handleChangeModalInput} onCancel={() => setOpenModal(false)} />
    </div>
  )
}

export default ListFriend
