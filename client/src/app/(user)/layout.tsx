import Footer from '@/app/(user)/_components/footer'
import Header from '@/app/(user)/_components/header'
import Sidebar from '@/app/(user)/_components/sidebar'
import clsx from 'clsx'
import { ReactNode } from 'react'
import userLayoutStyles from './user-layout.module.scss'

const { userLayout, mainWrapper } = userLayoutStyles

const UserLayout = ({ children }: { children: ReactNode }) => {
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
