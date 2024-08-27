'use client'
import { Breadcrumb, Layout } from 'antd'
import { ReactNode } from 'react'
import { AdminFooter, AdminHeader, AdminSidebar } from '@/components/layouts'

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
              // minHeight: 360,
              // background: '#ccc',
              // borderRadius: '#ccc'
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
