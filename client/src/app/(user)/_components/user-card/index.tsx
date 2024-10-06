'use client'
import { IUser } from '@/types/user-type'
import { Avatar, Button } from 'antd'
import React from 'react'
import styles from './user-card.module.scss'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const { userCard, userInfo, userName } = styles

interface IUserCardProps {
  user: IUser
  isAddFriend?: boolean
}

const UserCard = ({ user, isAddFriend }: IUserCardProps) => {
  const { firstName, lastName, photo, email } = user || {}
  const router = useRouter()

  const handleNavigateToChat = () => {
    router.push('/message')
  }

  return (
    <div className={clsx(userCard)}>
      {/* Left */}
      <div className={clsx(userInfo)}>
        <Avatar size={48} src={photo} />
        <div>
          <p className={clsx(userName)}>{`${firstName} ${lastName}`}</p>
          {/* {email && <p>@{`${email}`}</p>} */}
        </div>
      </div>

      {/* Right */}
      {isAddFriend ? (
        <Button type='primary'>Add Friend</Button>
      ) : (
        <Button type='primary' onClick={() => handleNavigateToChat()}>
          Chat
        </Button>
      )}
    </div>
  )
}

export default UserCard
