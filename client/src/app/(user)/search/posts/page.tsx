'use client'
import { Button, Empty, Flex, Skeleton } from 'antd'
import clsx from 'clsx'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/config/auth-options'
import styles from './search-post.module.scss'
import postService from '@/services/user/post-service'
import { IPost } from '@/types/post-type'
import PostCard from '@/app/(user)/_components/post-card'
import { Suspense, useEffect, useState } from 'react'
import SkeletonPost from '@/components/shared/skeleton-post'
import Loading from '@/components/shared/loading'
import { useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'

const { searchPostPage, links, postsList } = styles

interface ISearchPostsPageProps {
  // searchParams: {
  //   [key: string]: string | string[] | undefined
  // }
}

const SearchPostsPage = ({}: ISearchPostsPageProps) => {
  const searchParams = useSearchParams()
  const [posts, setPosts] = useState<IPost[] | []>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { data: session } = useSession()
  const keyword = searchParams.get('q')
  // const query = searchParams?.q?.toString() ?? ''
  // const session = await getServerSession(authOptions)
  // const accessToken = session?.token

  // // Call Api
  // let posts: IPost[] = []

  // setTimeout(async () => {
  //   posts = (await postService.getPostsByKeyword(
  //     accessToken as string,
  //     query
  //   )) as IPost[]
  // }, 300)

  useEffect(() => {
    const fetchPosts = async () => {
      if (session?.token) {
        try {
          const res = (await postService.getPostsByKeyword(
            session?.token,
            keyword as string
          )) as IPost[]

          if (res.length > 0) {
            setPosts(res)
          }
        } catch (error) {
          console.log('🚀error---->', error)
        } finally {
          setTimeout(() => {
            setIsLoading(false)
          }, 2000)
        }
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className={clsx(searchPostPage)}>
      <h2>Search results</h2>
      {/* Links */}
      <div className={clsx(links)}>
        <Link href={{ pathname: '/search/posts', query: { q: keyword } }}>
          <Button>Posts</Button>
        </Link>
        <Link href={{ pathname: '/search/users', query: { q: keyword } }}>
          <Button>Users</Button>
        </Link>
      </div>

      {/* Posts List */}
      {/* {posts.length > 0 ? (
        <div className={clsx(postsList)}>
          {posts.map((post: IPost) => {
            return <PostCard post={post} key={post.id} />
          })}
        </div>
      ) : (
        <Empty description='There are no posts' />
      )} */}

      {/* {posts.length === 0 &&
        Array(1)
          .fill('')
          .map((_, index) => <Skeleton key={index} />)} */}

      <div className={clsx(postsList)}>
        {!isLoading &&
          posts.length > 0 &&
          posts.map((post: IPost) => {
            return <PostCard post={post} key={post.id} />
          })}

        {isLoading &&
          Array(1)
            .fill('')
            .map((_, index) => <SkeletonPost key={index} />)}

        {!isLoading && posts.length === 0 && (
          <Empty description='There are no post' />
        )}
      </div>
    </div>
  )
}

export default SearchPostsPage
