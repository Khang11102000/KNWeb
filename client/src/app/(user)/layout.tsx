import Footer from '@/app/(user)/_components/footer'
import Header from '@/app/(user)/_components/header'
import Sidebar from '@/app/(user)/_components/sidebar'
import clsx from 'clsx'
import { ReactNode, useEffect } from 'react'
import userLayoutStyles from './user-layout.module.scss'
import useAuthenticated from '@/hooks/useAuthenticated'
import Loading from '@/components/shared/loading'
import { redirect, useRouter } from 'next/navigation'
import { PUBLIC_ROUTES } from '@/constants/routes'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/config/auth-options'

const { userLayout, mainWrapper } = userLayoutStyles

const UserLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions)

  // if (status === 'loading') return <Loading />

  if (!session) {
    redirect(PUBLIC_ROUTES.LOGIN)
  }

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
