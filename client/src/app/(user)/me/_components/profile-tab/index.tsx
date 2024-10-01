'use client'
import clsx from 'clsx'
import styles from './profile-tab.module.scss'
import { useState } from 'react'
import InformationForm from '@/app/(user)/me/_components/profile-tab/information-form'
import { ME_TABS } from '@/constants/tabs'
import { IUser } from '@/types/user-type'

const { wrapper, tabList, tabActive } = styles

interface IProfileTabProps {
  profile: IUser
}

const ProfileTab = ({ profile }: IProfileTabProps) => {
  const [activeTab, setActiveTab] = useState(ME_TABS[0].key)

  const handleTabChange = (tabKey: number) => {
    if (tabKey !== activeTab) {
      setActiveTab(tabKey)
    }
  }

  return (
    <div className={clsx(wrapper)}>
      {/* List tab */}
      <ul className={clsx(tabList)}>
        {ME_TABS.map(({ key, title }, index) => (
          <li
            key={key || index}
            onClick={() => handleTabChange(key)}
            className={clsx({
              [tabActive]: key === activeTab
            })}
          >
            {title}
          </li>
        ))}
      </ul>

      {/* Content */}
      {activeTab === 1 && <InformationForm profile={profile} />}
      {activeTab === 2 && <div>Change password</div>}
      {activeTab === 3 && <div>Email & SMS</div>}
      {activeTab === 4 && <div>Manage contact</div>}
    </div>
  )
}

export default ProfileTab
