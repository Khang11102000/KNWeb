import ProfileTab from '@/app/(user)/me/_components/profile-tab'
import { authOptions } from '@/config/auth-options'
import authService from '@/services/auth-service'
import { IUser } from '@/types/user-type'
import clsx from 'clsx'
import { getServerSession } from 'next-auth'
import styles from './me-page.module.scss'

const { wrapper } = styles

const UserProfilePage = async () => {
  const session = await getServerSession(authOptions)
  const profile = (await authService.getMe(session?.token as string)) as IUser

  return (
    <section className={clsx(wrapper)}>
      <ProfileTab profile={profile} />
    </section>
  )
}

export default UserProfilePage
