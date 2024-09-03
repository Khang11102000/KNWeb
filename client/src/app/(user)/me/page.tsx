import clsx from 'clsx'
import styles from './me-page.module.scss'
import ProfileTab from '@/app/(user)/me/_components/profile-tab'

const { wrapper } = styles

const UserProfilePage = () => {
  return (
    <section className={clsx(wrapper)}>
      <ProfileTab />
    </section>
  )
}

export default UserProfilePage
