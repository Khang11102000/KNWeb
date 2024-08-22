'use client'
import { AppstoreOutlined, BookOutlined, UserOutlined } from '@ant-design/icons'
import type { GetProp, MenuProps } from 'antd'
import { Layout, Menu } from 'antd'
import Link from 'next/link'
import { useState } from 'react'
import { PRIVATE_ROUTES } from '@/constants/routes'
import './AdminSideBar.scss'
const { Sider } = Layout

type MenuItem = GetProp<MenuProps, 'items'>[number]

const items: MenuItem[] = [
  {
    key: '1',
    icon: <AppstoreOutlined />,
    label: <Link href={PRIVATE_ROUTES.ADMIN.DASHBOARD}>Dashboard</Link>
  },
  {
    key: 'sub1',
    label: <Link href={PRIVATE_ROUTES.ADMIN.MANAGE_USERS}>Manage Users</Link>,
    icon: <UserOutlined />,
    children: [
      { key: '3', label: 'Option 3' },
      { key: '4', label: 'Option 4' }
    ]
  },
  {
    key: 'sub2',
    label: <Link href={PRIVATE_ROUTES.ADMIN.MANAGE_POST}>Manage Posts</Link>,
    icon: <BookOutlined />,
    children: [
      { key: '7', label: 'Option 7' },
      { key: '8', label: 'Option 8' },
      { key: '9', label: 'Option 9' },
      { key: '10', label: 'Option 10' }
    ]
  }
]

const AdminSideBar = () => {
  const [current, setCurrent] = useState<string>('')
  const _onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key)
  }
  return (
    <Sider breakpoint='lg' collapsedWidth='0'>
      <Link
        href={PRIVATE_ROUTES.ADMIN.DASHBOARD}
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '16px 0',
          fontWeight: 'bold'
        }}
      >
        Admin Workspace
      </Link>

      <Menu
        theme='dark'
        mode='inline'
        items={items}
        defaultOpenKeys={[current]}
        onClick={_onClick}
      />
    </Sider>
  )
}

export default AdminSideBar
