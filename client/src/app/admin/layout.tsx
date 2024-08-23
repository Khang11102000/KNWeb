'use client'
import { AdminFooter, AdminHeader, AdminSidebar } from '@/components/layouts'
import { Layout } from 'antd'
import { useSession } from 'next-auth/react'
import React from 'react'

const { Content } = Layout

const AdminLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  const { data: session, status } = useSession()

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
