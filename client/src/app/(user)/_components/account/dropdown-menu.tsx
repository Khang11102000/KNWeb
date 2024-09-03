import { Typography } from 'antd'
import clsx from 'clsx'
import Link from 'next/link'
import styles from './account.module.scss'
import { forwardRef } from 'react'
import {
  GlobeLock,
  LogOut,
  UserRound,
  UserRoundCog,
  UserRoundPen
} from 'lucide-react'

const { dropDownWrapper, menuItem } = styles

const { Title } = Typography

const ACCOUNT_MENUS = [
  {
    icon: <UserRound size={24} />,
    title: 'My profile',
    path: '/me'
  },
  {
    icon: <UserRoundPen size={24} />,
    title: 'Edit profile',
    path: '/me'
  },
  {
    icon: <UserRoundCog size={24} />,
    title: 'Settings',
    path: '/me'
  },
  {
    icon: <GlobeLock size={24} />,
    title: 'Privacy settings',
    path: '/me'
  },
  {
    icon: <LogOut size={24} />,
    title: 'Logout',
    path: '/me'
  }
]

interface IDropdownMenuProps {
  classNames?: string
}

const DropdownMenu = forwardRef<HTMLDivElement, IDropdownMenuProps>(
  ({ classNames = '' }, ref) => {
    return (
      <div className={clsx(dropDownWrapper, classNames)} ref={ref}>
        <Title level={5} style={{ padding: 26 }}>
          Nguyễn Kim Quốc Nam
        </Title>

        {/* Menu Item */}
        <ul>
          {ACCOUNT_MENUS.map(({ icon, path, title }, index) => (
            <li key={index}>
              <Link href={path} className={clsx(menuItem)}>
                {icon} <span>{title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
)

DropdownMenu.displayName = 'DropdownMenu'

export default DropdownMenu
