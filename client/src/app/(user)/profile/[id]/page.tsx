import React from 'react'
import SectionProfileHeader from './section-profile-header'
import styles from './profile-page.module.scss'
import clsx from 'clsx'

const { profilePage } = styles

const ProfilePage = () => {
  return (
    <div className={clsx(profilePage)}>
      {/* Section Profile Header */}
      <SectionProfileHeader />
    </div>
  )
}

export default ProfilePage
