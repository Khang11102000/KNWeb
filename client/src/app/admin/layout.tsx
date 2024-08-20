// import { groupRoles } from '@/constants/roles'
// import { PayloadJWTTypes } from '@/types/auth'
// import { decode } from '@/utils/jwt'
// import { cookies } from 'next/headers'
// import { redirect } from 'next/navigation'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const AdminLayout = ({ children }: Props) => {
  return (
    <>
      <Header type='admin' />
      <Sidebar />
      <main className='w-[calc(100%-300px)] ml-[300px] h-screen pt-16 px-4'>
        {children}
      </main>
    </>
  )
}

export default AdminLayout
