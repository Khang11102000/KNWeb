import React from 'react'
import Link from 'next/link'
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  AppstoreOutlined,
  CalendarOutlined,
  LinkOutlined,
  MailOutlined,
  SettingOutlined,
  BookOutlined
} from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import type { GetProp, MenuProps } from 'antd'

const { Sider } = Layout

type MenuItem = GetProp<MenuProps, 'items'>[number]

const items: MenuItem[] = [
  {
    key: '1',
    icon: <AppstoreOutlined />,
    label: <Link href='/admin/dashboard'>Dashboard</Link>
  },
  {
    key: 'sub1',
    label: <Link href='/admin/dashboard'>Manage User</Link>,
    icon: <UserOutlined />,
    children: [
      { key: '3', label: 'Option 3' },
      { key: '4', label: 'Option 4' }
    ]
  },
  {
    key: 'sub2',
    label: 'Manage Posts',
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
  return (
    <Sider
      breakpoint='lg'
      collapsedWidth='0'
      onBreakpoint={(broken) => {
        console.log(broken)
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type)
      }}
      // trigger={null}
      // collapsible
      // collapsed={isCollapsed}
    >
      <Link
        href='/'
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
        defaultSelectedKeys={['4']}
        defaultOpenKeys={['sub1']}
        items={items}
      />
    </Sider>
  )
}

export default AdminSideBar
