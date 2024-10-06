'use client'
import UserCard from '@/app/(user)/_components/user-card'
import userService from '@/services/user/user-service'
import { IUser } from '@/types/user-type'
import { Flex, Skeleton } from 'antd'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'

interface IListFriendProps {}

const USER_DATA = [
  {
    firstName: 'Nam',
    lastName: 'Quốc',
    photo: ''
    // email: 'nguyenkimquocnam@gmail.com'
  },
  {
    firstName: 'Khang',
    lastName: 'Võ',
    photo: ''
    // email: 'khangvo@gmail.com'
  },
  {
    firstName: 'Trang',
    lastName: 'Phạm',
    photo: ''
    // email: 'trangpham@gmail.com'
  }
]

const ListFriend = (props: IListFriendProps) => {
  const { data: session } = useSession()
  const userId = session?.user.id
  const [friends, setFriends] = useState<IUser[] | []>([])
  const [isLoading, setisLoading] = useState<boolean>(true)

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

  return (
    <div style={{ width: 260 }}>
      {!isLoading &&
        friends.length > 0 &&
        friends.map((user) => {
          return <UserCard key={user.id} user={user} />
        })}

      {isLoading &&
        friends.length === 0 &&
        Array(3)
          .fill('')
          .map((_, index) => {
            return (
              <Flex
                align='center'
                justify='space-between'
                key={index}
                style={{ minHeight: 84 }}
              >
                <Flex align='center' gap={8}>
                  <Skeleton.Avatar active size={48} />
                  <Skeleton.Input
                    active
                    style={{ minWidth: 120, width: 120 }}
                  />
                </Flex>
                <Skeleton.Button active />
              </Flex>
            )
          })}
    </div>
  )
}

export default ListFriend
