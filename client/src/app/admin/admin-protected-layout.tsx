'use client'
import { AdminFooter, AdminHeader, AdminSidebar } from '@/components/layouts'
import { Layout } from 'antd'
import { ReactNode } from 'react'

const { Content } = Layout

const AdminProtectedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Layout style={{ height: '100vh' }}>
      <AdminSidebar />
      <Layout>
        <AdminHeader />
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24
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

export default AdminProtectedLayout
