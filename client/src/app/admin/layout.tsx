'use client'
import { AdminFooter, AdminHeader, AdminSidebar } from '@/components/layouts'
import { ADMIN_ROLE } from '@/constants/role'
import useAuthenticated from '@/hooks/useAuthenticated'
import { Layout, notification } from 'antd'
import React, { useEffect } from 'react'

const { Content } = Layout

const AdminLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  // const { session } = useAuthenticated()
  // useEffect(() => {
  //   if (session && session.user.role.id === ADMIN_ROLE.code) {
  //     notification.error({
  //       message: 'Permission Denied',
  //       description: 'You have not allowed to access this page'
  //     })
  //   }
  // }, [session])

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
