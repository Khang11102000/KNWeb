import { Button, Empty } from 'antd'
import clsx from 'clsx'
import Link from 'next/link'
import styles from './search-user.module.scss'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/config/auth-options'
import userService from '@/services/user/user-service'
import { IUser } from '@/types/user-type'
import UserCard from '@/app/(user)/_components/user-card'

const { searchUserPage, links, usersList } = styles

interface ISearchUsersProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const SearchUsersPage = async ({ searchParams }: ISearchUsersProps) => {
  const query = searchParams?.q?.toString() ?? ''
  const session = await getServerSession(authOptions)
  const accessToken = session?.token

  // Call Api
  const users = (await userService.getUsersByKeyword(
    accessToken as string,
    query
  )) as IUser[]

  return (
    <div className={clsx(searchUserPage)}>
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

      {/* Users List */}
      {users.length > 0 ? (
        <div className={clsx(usersList)}>
          {users.map((user: IUser) => {
            return <UserCard user={user} key={user.id} />
          })}
        </div>
      ) : (
        <Empty description='There are no users' />
      )}
    </div>
  )
}

export default SearchUsersPage
