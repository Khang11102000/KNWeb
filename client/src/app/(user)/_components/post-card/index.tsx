import { Avatar, Card, Flex, Space } from 'antd'
import styles from './post-card.module.scss'
import clsx from 'clsx'

interface IPostCardProps {
  post: any
}

const { postCard, headerCard } = styles

const PostCard = ({ post }: IPostCardProps) => {
  return (
    <Card
      className={clsx(postCard)}
      title={
        <Flex align='center' gap={14}>
          <Avatar size={64} src={post?.avatar} />
          <p>{post?.name || ''}</p>
        </Flex>
      }
      extra={<a href='#'>More</a>}
      // style={{ width: 300 }}
    >
      {/* Header */}
      {/* Content */}
      {/* Comments */}
    </Card>
  )
}

export default PostCard
