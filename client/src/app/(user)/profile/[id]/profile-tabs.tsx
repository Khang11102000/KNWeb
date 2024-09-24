'use client'
import FeedContent from '@/app/(user)/profile/[id]/feed-content'
import { IPost } from '@/types/post-type'
import { Tabs, TabsProps } from 'antd'

interface IProfileTabsProps {
  posts: IPost[]
}

const ProfileTabs = ({ posts }: IProfileTabsProps) => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Feed',
      children: <FeedContent posts={posts} />
    },
    {
      key: '2',
      label: 'About',
      children: 'Content of Tab Pane 2'
    },
    {
      key: '3',
      label: 'Connections',
      children: 'Content of Tab Pane 3'
    }
  ]

  const onChange = (key: string) => {
    console.log(key)
  }
  return (
    <Tabs
      style={{ background: '#fff', paddingInline: 16 }}
      defaultActiveKey='1'
      items={items}
      onChange={onChange}
    />
  )
}

export default ProfileTabs
