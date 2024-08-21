'use client'
import { AdminFooter, AdminHeader, AdminSidebar } from '@/components/layouts'
import {
  LaptopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  NotificationOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Button, Layout, Menu, theme, type MenuProps } from 'antd'
import Link from 'next/link'
import React, { useState } from 'react'

const { Header, Content, Footer, Sider } = Layout

const AdminLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  // const {
  //   token: { colorBgContainer, borderRadiusLG }
  // } = theme.useToken()

  // const [collapsed, setCollapsed] = useState<boolean>(false)

  return (
    <Layout style={{ height: '100vh' }}>
      <AdminSidebar />
      <Layout>
        <AdminHeader />
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: '#ccc',
              borderRadius: '#ccc'
            }}
          >
            {children}
          </div>
        </Content>
        <AdminFooter />
      </Layout>
    </Layout>
  )
}

export default AdminLayout
