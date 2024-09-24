import { Typography } from 'antd'
import clsx from 'clsx'
import Link from 'next/link'
import styles from './account.module.scss'
import { forwardRef, MouseEvent } from 'react'
import {
  GlobeLock,
  LogOut,
  UserRound,
  UserRoundCog,
  UserRoundPen
} from 'lucide-react'
import { IUser } from '@/types/user-type'
import { useRouter } from 'next/navigation'
import { PRIVATE_ROUTES } from '@/constants/routes'

const { dropDownWrapper, menuItem } = styles

const { Title } = Typography

const ACCOUNT_MENUS = [
  {
    icon: <UserRound size={24} />,
    title: 'My profile',
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
  data: IUser | null
}

const DropdownMenu = forwardRef<HTMLDivElement, IDropdownMenuProps>(
  ({ data, classNames = '' }, ref) => {
    const router = useRouter()
    const { firstName, lastName, id } = data || {}

    const _onTitleClick = (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation()
      router.push(`${PRIVATE_ROUTES.USER.PROFILE}/${id}`)
    }

    return (
      <div className={clsx(dropDownWrapper, classNames)} ref={ref}>
        <Title
          level={5}
          style={{ padding: 26, cursor: 'pointer' }}
          onClick={_onTitleClick}
        >
          {`${firstName} ${lastName}`}
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
