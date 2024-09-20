'use client'
import Image from 'next/image'
import styles from './profile-page.module.scss'
import clsx from 'clsx'
import { Avatar, Button, Tabs, TabsProps } from 'antd'
import PostCard from '@/app/(user)/_components/post-card'
import SectionCreatePost from '@/app/(user)/_components/section-create-post'
import TabsComponent from '@/app/(user)/_components/tabs-component'

const {
  sectionProfileHeader,
  coverImageWrapper,
  image,
  userInfo,
  contact,
  name,
  avatar
} = styles

// const LIST_POST = [
//   {
//     name: 'Nguyễn Kim Quốc Nam',
//     timePost: '3 hours',
//     avatar: '',
//     content:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus',
//     images: [
//       'https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
//     ]
//   },
//   {
//     name: 'Nguyễn Kim Quốc Nam',
//     timePost: '3 hours',
//     avatar: '',
//     content:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus',
//     images: [
//       'https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
//     ]
//   },
//   {
//     name: 'Nguyễn Kim Quốc Nam',
//     timePost: '3 hours',
//     avatar: '',
//     content:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus',
//     images: [
//       'https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
//     ]
//   }
// ]

const items = [
  {
    key: '1',
    tabLabel: 'About',
    tabContent: 'Content of Tab Pane 1'
  },
  {
    key: '2',
    tabLabel: 'Membership',
    tabContent: 'Content of Tab Pane 2'
  },
  {
    key: '3',
    tabLabel: 'Discussion',
    tabContent: 'Content of Tab Pane 3'
  }
]

const SectionProfileHeader = () => {
  return (
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
            src='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          />
          <div className={clsx(name)}>Nguyễn Kim Quốc Nam</div>
        </div>

        {/* Actions */}
        <div>
          <Button type='primary'>Add Friend</Button>
        </div>
      </div>

      {/* Tabs */}
      {/* <SectionCreatePost /> */}
      {/* <Tabs defaultActiveKey='1' items={items} onChange={_onTabChange} /> */}
      <TabsComponent items={items} />
    </section>
  )
}

export default SectionProfileHeader
