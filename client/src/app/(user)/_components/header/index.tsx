'use client'
import Account from '@/app/(user)/_components/account'
import headerStyles from './header.module.scss'
import Search from '@/components/shared/custom-search'
import Logo from '@/components/shared/logo'
import { Menu } from 'lucide-react'
import clsx from 'clsx'
import useWindowSize from '@/hooks/useWindowSize'

const { header, container, logoContainer } = headerStyles

const Header = () => {
  const windowSize = useWindowSize()
  return (
    <header className={clsx(header)}>
      <div className={clsx(container)}>
        <div className={clsx(logoContainer)}>
          <Logo />
          {windowSize <= 1198.98 && (
            <Menu style={{ cursor: 'pointer', color: '#2f65b9' }} />
          )}
        </div>

        {windowSize >= 992 && (
          <Search placeholder='Search for people or groups...' />
        )}
        <Account />
      </div>
    </header>
  )
}

export default Header
