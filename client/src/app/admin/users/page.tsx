import UsersTable from '@/app/admin/users/users-table'
import CustomBreadCrumb from '@/components/shared/custom-breadcrumb/custom-breadcrum'
import { authOptions } from '@/config/auth-options'
import { PRIVATE_ROUTES } from '@/constants/routes'
import userService from '@/services/admin/user-service'
import { IGetUserResponse } from '@/types/user-type'
import { HomeOutlined, UserOutlined } from '@ant-design/icons'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

const items = [
  {
    title: (
      <>
        <HomeOutlined />
        <Link href={PRIVATE_ROUTES.ADMIN.DASHBOARD}>Dashboard</Link>
      </>
    )
  },
  {
    title: (
      <>
        <UserOutlined />
        <span>Users</span>
      </>
    )
  }
]

const ManageUsersPage = async () => {
  const session = await getServerSession(authOptions)
  const accessToken = session?.token

  const res = await userService.getUsers(accessToken as string)
  const users = (res as IGetUserResponse).data || []
  console.log('🚀users---->', users)

  return (
    <>
      <CustomBreadCrumb items={items} />
      <UsersTable users={users} />
    </>
  )
}

export default ManageUsersPage
