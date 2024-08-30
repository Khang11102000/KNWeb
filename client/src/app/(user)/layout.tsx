import Footer from '@/app/(user)/_components/footer'
import Header from '@/app/(user)/_components/header'
import Sidebar from '@/app/(user)/_components/sidebar'
import { ReactNode } from 'react'
import userLayoutStyles from './user-layout.module.scss'

const { userLayout, mainWrapper } = userLayoutStyles

const UserLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      <main className={`${userLayout} ${mainWrapper}`}>
        <Sidebar />
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default UserLayout
