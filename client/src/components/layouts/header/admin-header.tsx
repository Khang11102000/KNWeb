'use client'
import HTTP_STATUS_CODES from '@/constants/http-status-codes'
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '@/constants/routes'
import authService from '@/services/auth-service'
import { BellOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import {
  Avatar,
  Badge,
  Dropdown,
  Flex,
  Layout,
  notification,
  theme
} from 'antd'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const { Header } = Layout

const AdminHeader = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  const handleLogout = async (e: any) => {
    try {
      if (status === 'authenticated') {
        const res = (await authService.logout(session?.token as string)) as {
          message: string
          statusCode: number
        }

        if (res.statusCode === HTTP_STATUS_CODES.UNAUTHORIZED.statusCode) {
          throw new Error(res.message)
        }

        signOut({ redirect: false })
        notification.success({
          message: res.message || 'Success',
          description: 'Logout is successfully'
        })
        router.push(PUBLIC_ROUTES.LOGIN)
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Logout Failed'
      })
    }
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <Link href={PRIVATE_ROUTES.ADMIN.PROFILE}>Profile</Link>
    },

    {
      key: '2',
      danger: true,
      label: <div onClick={handleLogout}>Logout</div>
    }
  ]

  const {
    token: { colorBgContainer }
  } = theme.useToken()

  return (
    <Header style={{ padding: '0 16px', background: colorBgContainer }}>
      <Flex align='center' justify='flex-end'>
        <Flex align='center' gap='14px'>
          <Badge dot>
            <BellOutlined />
          </Badge>
          <Dropdown
            menu={{ items }}
            arrow
            trigger={['click']}
            overlayStyle={{ width: '156px' }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Avatar icon={<UserOutlined />} />
            </a>
          </Dropdown>
        </Flex>
      </Flex>
    </Header>
  )
}

export default AdminHeader
