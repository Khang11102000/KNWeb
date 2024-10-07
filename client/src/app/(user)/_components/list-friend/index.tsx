'use client'
import UserCard from '@/app/(user)/_components/user-card'
import SkeletonUser from '@/components/shared/skeleton-user'
import userService from '@/services/user/user-service'
import { IUser } from '@/types/user-type'
import { Flex, Skeleton } from 'antd'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'

const ListFriend = () => {
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
            return <SkeletonUser key={index} />
          })}
    </div>
  )
}

export default ListFriend
