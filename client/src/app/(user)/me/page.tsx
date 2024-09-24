import clsx from 'clsx'
import styles from './me-page.module.scss'
import ProfileTab from '@/app/(user)/me/_components/profile-tab'
import { getSession } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/config/auth-options'

const { wrapper } = styles

const UserProfilePage = async () => {
  const session = await getServerSession(authOptions)

  return (
    <section className={clsx(wrapper)}>
      <ProfileTab />
    </section>
  )
}

export default UserProfilePage
