'use client'
import { Avatar, Button } from 'antd'
import React from 'react'
import styles from './user-card.module.scss'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import userService from '@/services/user/user-service'
import { useSession } from 'next-auth/react'
const { userCard, userInfo, userName } = styles


interface IUser {
  id: string
  name: string
  avt: string
  friendCount: number
}

const UserCardSecond = ({ id, name, avt, friendCount }: IUser) => {
  const path = usePathname()
  const { data: session, status } = useSession()
  let items: MenuProps['items'] = [];
  switch (path) {
    case '/friendList':
      items = [
        {
          label: <div onClick={() => handleClickDropdown("Unfriend")}>Huỷ kết bạn</div>,
          key: '0',
        },
      ];
      break;
    case '/followings':
      items = [
        {
          label: <div onClick={() => handleClickDropdown("Unfollow")}>Bỏ theo dõi</div>,
          key: '0',
        },
      ];
      break;
    case '/followers':
      items = [
        {
          label: <div onClick={() => handleClickDropdown("Accept")}>Chấp nhận kết bạn</div>,
          key: '0',
        },
        {
          label: <div onClick={() => handleClickDropdown("Reject")}>Huỷ lời mời kết bạn</div>,
          key: '0',
        }]
      break;
  }
  const handleClickDropdown = (key: string) => {
    switch (key) {
      case 'Unfriend':
        userService.addFriend(session?.token || "", {
          firstUserId: session?.user.id,
          secondUserId: id,
          key: 'cancelFriend'
        })
        break;
      case 'Unfollow':
        userService.addFriend(session?.token || "", {
          firstUserId: session?.user.id,
          secondUserId: id,
          key: 'cancelFriendRequest'
        })
        break;
      case 'Accept':
        userService.addFriend(session?.token || "", {
          firstUserId: session?.user.id,
          secondUserId: id,
          key: 'acceptFriendRequest'
        })
        break;
      case 'Reject':
        userService.addFriend(session?.token || "", {
          firstUserId: id,
          secondUserId: session?.user.id,
          key: 'cancelFriendRequest'
        })
        break;
      default:
        break;
    }
  }

  return (
    <div style={{ width: '250px', height: '350px', border: '1px solid black', padding: '10px', margin: '10px' }}>
      <Image src={avt} alt={name} width={230} height={230} />
      <div>{name}</div>
      <div>{friendCount ? friendCount : 0} Bạn bè</div>
      <Dropdown menu={{ items }} trigger={['click']}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            Bạn bè
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  )
}

export default UserCardSecond
