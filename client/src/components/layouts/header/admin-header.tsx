'use client'
import { BellOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Avatar, Badge, Dropdown, Flex, Layout, theme } from 'antd'
import Link from 'next/link'

const { Header } = Layout

const items: MenuProps['items'] = [
  {
    key: '1',
    label: <Link href='/admin/profile'>Profile</Link>
  },

  {
    key: '2',
    danger: true,
    label: 'Logout'
  }
]

const AdminHeader = () => {
  const {
    token: { colorBgContainer, borderRadiusLG }
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
