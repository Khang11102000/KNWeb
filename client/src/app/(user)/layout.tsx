'use client'
import clsx from 'clsx'
import Header from '@/app/(user)/_components/header'
import Sidebar from '@/app/(user)/_components/sidebar'
import Loading from '@/components/shared/loading'
import { ReactNode, Suspense } from 'react'
import userLayoutStyles from './user-layout.module.scss'
import { usePathname } from 'next/navigation'
import ListFriend from '@/app/(user)/_components/list-friend'

const { userLayout, mainWrapper } = userLayoutStyles

const UserLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()

  return (
    <div>
      <Header />
      <main className={clsx(userLayout, mainWrapper)}>
        <Sidebar />
        <div style={{ display: 'flex', gap: 26 }}>
          <Suspense fallback={<Loading />}>
            <div style={{ flex: 1 }}>{children}</div>
          </Suspense>
          {pathname === '/' ? <ListFriend /> : <></>}
        </div>
      </main>
    </div>
  )
}

export default UserLayout
