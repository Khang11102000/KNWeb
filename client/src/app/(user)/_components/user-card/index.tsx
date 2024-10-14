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
  onClick?: (e: any) => void
}

const UserCard = ({ user, isAddFriend, onClick }: IUserCardProps) => {
  const { id, firstName, lastName, photo, email } = user || {}
  // const router = useRouter()

  // const handleNavigateToChat = () => {
  //   router.push('/message')
  // }

  return (
    <div className={clsx(userCard)} style={{ cursor: 'pointer' }} onClick={(e) => onClick && onClick(e)}>
      {/* Left */}
      <div className={clsx(userInfo)} >
        <Avatar size={48} src={photo} />
        <div>
          <p className={clsx(userName)}>{`${firstName} ${lastName}`}</p>
          {/* {email && <p>@{`${email}`}</p>} */}
        </div>
      </div>
      <div style={{ color: '#00ff22' }}>Online</div>
      {/* Right */}
    </div>
  )
}

export default UserCard
