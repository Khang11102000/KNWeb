import { IUser } from '@/types/user-type'
import { Avatar, Button } from 'antd'
import React from 'react'
import styles from './user-card.module.scss'
import clsx from 'clsx'

const { userCard, userInfo, userName } = styles

interface IUserCardProps {
  user: IUser
}

const UserCard = ({ user }: IUserCardProps) => {
  const { firstName, lastName, photo, email } = user || {}

  return (
    <div className={clsx(userCard)}>
      {/* Left */}
      <div className={clsx(userInfo)}>
        <Avatar size={48} src={photo} />
        <div>
          <p className={clsx(userName)}>{`${firstName} ${lastName}`}</p>
          {email && <p>@{`${email}`}</p>}
        </div>
      </div>

      {/* Right */}
      {/* <Button type='primary'>Add Friend</Button> */}
    </div>
  )
}

export default UserCard
