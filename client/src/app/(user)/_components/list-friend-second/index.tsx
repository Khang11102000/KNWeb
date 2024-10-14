'use client'
import React from 'react'
import UserCardSecond from '../user-card-second'


interface IProps {
    users: any[]
}
const ListFriendSecond = ({ users }: IProps) => {
    const [listUser, setListUser] = React.useState<any[]>([])
    React.useMemo(() => {
        if (users && users.length > 0) {
            setListUser(users)
        }
    }, [users.length])


    return (
        <div>
            {listUser.length > 0 &&
                listUser.map((user) =>
                    <UserCardSecond
                        key={user.id}
                        id={user.id}
                        name={`${user.firstName} ${user.lastName}`}
                        avt={user.photo}
                        friendCount={user.friends?.length}
                    />
                )}
        </div>
    )
}
export default ListFriendSecond
