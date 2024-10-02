import { message, notification, Typography } from 'antd'
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
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '@/constants/routes'
import { signOut, useSession } from 'next-auth/react'
import authService from '@/services/auth-service'
import HTTP_STATUS_CODES from '@/constants/http-status-codes'

const { dropDownWrapper, menuItem } = styles

const { Title } = Typography

interface IDropdownMenuProps {
  classNames?: string
  data: IUser | null
}

const DropdownMenu = forwardRef<HTMLDivElement, IDropdownMenuProps>(
  ({ data, classNames = '' }, ref) => {
    const router = useRouter()
    const { firstName, lastName, id } = data || {}
    const { data: session } = useSession()

    const _onTitleClick = (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation()
      router.push(`${PRIVATE_ROUTES.USER.PROFILE}/${id}`)
    }

    const handleLogout = async () => {
      try {
        if (session) {
          const res = (await authService.logout(session?.token as string)) as {
            message: string
            statusCode: number
          }

          if (res.statusCode === HTTP_STATUS_CODES.UNAUTHORIZED.statusCode) {
            throw new Error(res.message)
          } else {
            await signOut({ redirect: false })
            message.success('Logout is successfully')
            router.push(PUBLIC_ROUTES.LOGIN)
          }
        }
      } catch (error) {
        message.error('Logout is failed. Please, try again!')
      }
    }

    const ACCOUNT_MENUS = [
      {
        icon: <UserRound size={24} />,
        title: 'My profile',
        path: '/me'
      },
      {
        icon: <LogOut size={24} onClick={handleLogout} />,
        title: 'Logout',
        onClick: () => handleLogout()
      }
    ]

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
          {ACCOUNT_MENUS.map(({ icon, path, title, onClick }, index) => {
            return (
              <li key={index}>
                {path ? (
                  <Link href={path} className={clsx(menuItem)}>
                    {icon} <span>{title}</span>
                  </Link>
                ) : (
                  <div className={clsx(menuItem)} onClick={() => onClick?.()}>
                    {icon} <span>{title}</span>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
)

DropdownMenu.displayName = 'DropdownMenu'

export default DropdownMenu
