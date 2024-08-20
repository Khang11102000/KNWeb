import ButtonAddUser from '@/app/admin/users/button-add'
import UserTable from '@/app/admin/users/user-table'
import Pagination from '@/components/pagination'
import { LIMIT_USERS } from '@/constants/pagination'
import accountService from '@/services/account-service'
import { UserTypes } from '@/types/user'
import { cookies } from 'next/headers'

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

const ManageUserPage = async ({ searchParams }: Props) => {
  const cookieStore = cookies()
  const token = cookieStore.get('token')
  const accessToken = token?.value && JSON.parse(token.value).accessToken

  const currentPage = Number(searchParams.page) || 1
  const limit = Number(searchParams.limit) || LIMIT_USERS
  const res: any = await accountService.getUsers(
    accessToken,
    `?page=${currentPage}&limit=${limit}`
  )

  const users = res?.data.users as UserTypes
  const total = res?.data?.count

  return (
    <>
      <div className='flex items-center justify-between pt-10'>
        <h2>Users</h2>
        <ButtonAddUser />
      </div>
      <UserTable users={users} />
      <Pagination
        containerStyles='justify-end mt-5'
        total={total}
        page={currentPage}
        limit={limit}
      />
    </>
  )
}

export default ManageUserPage
