import { Button, Empty } from 'antd'
import clsx from 'clsx'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/config/auth-options'
import styles from './search-post.module.scss'
import postService from '@/services/user/post-service'
import { IPost } from '@/types/post-type'
import PostCard from '@/app/(user)/_components/post-card'

const { searchPostPage, links, postsList } = styles

interface ISearchPostsPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const SearchPostsPage = async ({ searchParams }: ISearchPostsPageProps) => {
  const query = searchParams?.q?.toString() ?? ''
  const session = await getServerSession(authOptions)
  const accessToken = session?.token

  // Call Api
  const posts = (await postService.getPostsByKeyword(
    accessToken as string,
    query
  )) as IPost[]

  return (
    <div className={clsx(searchPostPage)}>
      <h2>Search results</h2>
      {/* Links */}
      <div className={clsx(links)}>
        <Link href={{ pathname: '/search/posts', query: { q: query } }}>
          <Button>Posts</Button>
        </Link>
        <Link href={{ pathname: '/search/users', query: { q: query } }}>
          <Button>Users</Button>
        </Link>
      </div>

      {/* Posts List */}
      {posts.length > 0 ? (
        <div className={clsx(postsList)}>
          {posts.map((post: IPost) => {
            return <PostCard post={post} key={post.id} />
          })}
        </div>
      ) : (
        <Empty description='There are no posts' />
      )}
    </div>
  )
}

export default SearchPostsPage
