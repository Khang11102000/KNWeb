import Footer from '@/app/(user)/_components/footer'
import Header from '@/app/(user)/_components/header'
import Sidebar from '@/app/(user)/_components/sidebar'
import { authOptions } from '@/config/auth-options'
import { PUBLIC_ROUTES } from '@/constants/routes'
import clsx from 'clsx'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import userLayoutStyles from './user-layout.module.scss'

const { userLayout, mainWrapper } = userLayoutStyles

const UserLayout = async ({ children }: { children: ReactNode }) => {
  // const session = await getServerSession(authOptions)

  // if (!session) {
  //   redirect(PUBLIC_ROUTES.LOGIN)
  // }

  return (
    <div>
      <Header />
      <main className={clsx(userLayout, mainWrapper)}>
        <Sidebar />
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default UserLayout
