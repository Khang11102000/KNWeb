'use client'
import React from 'react'
import ListFriendSecond from '../_components/list-friend-second'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { IUser } from '@/types/user-type'
import userService from '@/services/user/user-service'

const FriendPage: React.FC = () => {
    const path = usePathname()

    const { data: session, status } = useSession();
    const userId = session?.user.id

    const [listUser, setListUser] = React.useState<IUser[]>([])

    const fetchAllFriends = React.useCallback(async () => {
        if (session?.token && userId) {
            switch (path) {
                case '/friendList':
                    await userService.getAllFriend(
                        userId
                        , session?.token
                    ).then((res: any) => {
                        if (res.data) {
                            setListUser(res.data)
                        }
                    })
                    break;
                case '/followings':
                    await userService.getAllFollowings(userId
                        , session?.token
                    ).then((res: any) => setListUser(res?.data))
                    break;
                case '/followers':
                    await userService.getAllFollowers(
                        userId
                        , session?.token
                    ).then((res: any) => setListUser(res?.data))
                    break;
            }
        }
    }, [userId, session?.token])

    React.useEffect(() => {
        fetchAllFriends()
    }, [fetchAllFriends])

    return (
        <ListFriendSecond users={listUser}></ListFriendSecond>
    )
}
export default FriendPage
