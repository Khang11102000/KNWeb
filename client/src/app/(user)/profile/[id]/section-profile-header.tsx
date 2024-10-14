'use client'
import Image from 'next/image'
import styles from './profile-page.module.scss'
import clsx from 'clsx'
import { Avatar, Button, Tabs, TabsProps } from 'antd'
import PostCard from '@/app/(user)/_components/post-card'
import SectionCreatePost from '@/app/(user)/_components/create-post'
import TabsComponent from '@/app/(user)/_components/tabs-component'
import ProfileTabs from '@/app/(user)/profile/[id]/profile-tabs'
import useAuthenticated from '@/hooks/useAuthenticated'
import { useSession } from 'next-auth/react'
import { IUser } from '@/types/user-type'
import userService from '@/services/user/user-service'

const {
  sectionProfileHeader,
  coverImageWrapper,
  image,
  userInfo,
  contact,
  name,
  avatar
} = styles

interface ISectionProfileHeaderProps {
  user: IUser
}

const SectionProfileHeader = ({ user }: ISectionProfileHeaderProps) => {
  const { firstName, lastName, photo } = user
  const { data: session, status } = useSession()
  const fullName = `${firstName} ${lastName}`

  const handleAddFriend = () => {
    userService.addFriend(session?.token || "", {
      firstUserId: session?.user.id,
      secondUserId: user.id,
      key: "sendFriendRequest"
    })
  }
  return (
    <>
      <section className={clsx(sectionProfileHeader)}>
        {/* Cover Image */}
        <div className={clsx(coverImageWrapper)}>
          <Image
            className={clsx(image)}
            alt=''
            width={960}
            height={250}
            priority
            src='https://images.unsplash.com/photo-1726461974101-d98a3c616dcc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          />
        </div>

        {/* User Infor */}
        <div className={clsx(userInfo)}>
          {/* Avatar & Name */}
          <div className={clsx(contact)}>
            <Avatar
              style={{ border: '3px solid red' }}
              size={100}
              className={clsx(avatar)}
              src={
                photo ||
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              }
            />
            <div className={clsx(name)}>{fullName}</div>
          </div>

          {/* Actions */}
          <div>
            <Button type='primary' onClick={handleAddFriend}>{user.friends?.find((item) => item === session?.user.id) ? 'Add Friend' : 'Friend'}</Button>
          </div>
        </div>
      </section>
    </>
  )
}

export default SectionProfileHeader
