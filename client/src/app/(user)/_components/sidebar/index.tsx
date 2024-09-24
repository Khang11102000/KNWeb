import SidebarItem from '@/app/(user)/_components/sidebar/sidebar-item'
import Logo from '@/components/shared/logo'
import clsx from 'clsx'
import { Group, Newspaper, UserRound, UsersRound, Mail } from 'lucide-react'
import { ReactNode } from 'react'
import sidebarStyles from './sidebar.module.scss'
import { PUBLIC_ROUTES } from '@/constants/routes'
// import SidebarItem from '@/app/(user)/_components/sidebar/sidebar-item'

const { sidebar, logo, sidebarList, title, active } = sidebarStyles

interface ISubItem {
  text: string
  icon?: ReactNode
  path: string
}

interface ISidebarItem {
  text: string
  icon?: ReactNode
  path: string
  subMenu?: ISubItem[]
}

const SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    text: 'Newsfeed',
    icon: <Newspaper />,
    path: PUBLIC_ROUTES.HOME
  },
  {
    text: 'Profile',
    icon: <UserRound />,
    path: '#profile'
  },
  {
    text: 'Friends',
    icon: <UsersRound />,
    path: '#friends',
    subMenu: [
      {
        text: 'Friend list',
        path: '#friendList'
      },
      {
        text: 'Friend profile',
        path: '#friendsProfile'
      }
    ]
  },
  {
    text: 'Groups',
    icon: <Group />,
    path: '#groups'
  },
  {
    text: 'Message',
    icon: <Mail />,
    path: '/message'
  }
]

const Sidebar = () => {
  return (
    <aside className={sidebar}>
      <div>
        {/* Logo */}
        <div>
          <Logo containerClassNames={clsx(logo)} />
        </div>

        {/* Menu List */}
        <div>
          <div className={clsx(sidebarList)}>
            <h5 className={clsx(title)}>Main</h5>
            <ul>
              {SIDEBAR_ITEMS.map((item, index) => {
                return <SidebarItem {...item} key={index} />
              })}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
