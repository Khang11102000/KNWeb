import AdminProtectedLayout from '@/app/admin/admin-protected-layout'

const AdminLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return <AdminProtectedLayout>{children}</AdminProtectedLayout>
}

export default AdminLayout
