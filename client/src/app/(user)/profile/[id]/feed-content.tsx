import CreatePost from '@/app/(user)/_components/create-post'
import PostCard from '@/app/(user)/_components/post-card'
import styles from './profile-page.module.scss'
import clsx from 'clsx'
import { IPost } from '@/types/post-type'
import React from 'react'
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons'
import { Avatar, Empty, List, Space } from 'antd'

const { postList, feedWrapper, createPost } = styles

interface IFeedContentProps {
  posts: IPost[]
}

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)

const FeedContent = ({ posts = [] }: IFeedContentProps) => {
  return (
    <div className={clsx(feedWrapper)}>
      <CreatePost containerClassNames={clsx(createPost)} />
      {posts.length > 0 ? (
        <div className={clsx(postList)}>
          {posts.map((post) => {
            return <PostCard key={post.id} post={post} />
          })}
        </div>
      ) : (
        <Empty description='There are no post' />
      )}
    </div>
  )
}

export default FeedContent
