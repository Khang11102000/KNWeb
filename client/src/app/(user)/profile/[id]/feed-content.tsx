import CreatePost from '@/app/(user)/_components/create-post'
import PostCard from '@/app/(user)/_components/post-card'
import styles from './profile-page.module.scss'
import clsx from 'clsx'
import { IPost } from '@/types/post-type'
import React, { useEffect, useState } from 'react'
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons'
import { Avatar, Empty, List, Skeleton, Space } from 'antd'

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
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    let timeoutId: any
    if (posts.length === 0) {
      timeoutId = setTimeout(() => {
        setIsLoading(true)
      }, 3000)
    } else {
      timeoutId = setTimeout(() => {
        setIsLoading(false)
      }, 3000)
    }

    return () => clearTimeout(timeoutId)
  }, [posts.length])

  return (
    <div className={clsx(feedWrapper)}>
      <CreatePost containerClassNames={clsx(createPost)} />
      {/* {isLoading &&
        new Array(3).fill('').map((_, index) => {
          return <Skeleton active key={index} avatar paragraph={{ rows: 4 }} />
        })} */}

      {!isLoading && posts.length > 0 && (
        <div className={clsx(postList)}>
          {posts.map((post) => {
            return <PostCard key={post.id} post={post} />
          })}
        </div>
      )}

      {!isLoading && posts.length === 0 && (
        <Empty description='There are no post' />
      )}
    </div>
  )
}

export default FeedContent
