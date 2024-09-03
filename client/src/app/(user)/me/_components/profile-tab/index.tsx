'use client'
import clsx from 'clsx'
import styles from './profile-tab.module.scss'
import { useState } from 'react'
import InformationForm from '@/app/(user)/me/_components/profile-tab/information-form'

const { wrapper, tabList, tabActive } = styles

const TABS = [
  {
    key: 1,
    title: 'Personal information'
  },
  {
    key: 2,
    title: 'Change password'
  },
  {
    key: 3,
    title: 'Email & SMS'
  },
  {
    key: 4,
    title: 'Manage contact'
  }
]

const ProfileTab = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].key)

  const handleTabChange = (tabKey: number) => {
    if (tabKey !== activeTab) {
      setActiveTab(tabKey)
    }
  }

  return (
    <div className={clsx(wrapper)}>
      {/* List tab */}
      <ul className={clsx(tabList)}>
        {TABS.map(({ key, title }, index) => (
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
      {activeTab === 1 && <InformationForm />}
      {activeTab === 2 && <div>Change password</div>}
      {activeTab === 3 && <div>Email & SMS</div>}
      {activeTab === 4 && <div>Manage contact</div>}
    </div>
  )
}

export default ProfileTab
