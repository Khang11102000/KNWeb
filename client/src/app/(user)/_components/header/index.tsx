import Account from '@/app/(user)/_components/account'
import headerStyles from './header.module.scss'
import Search from '@/components/shared/custom-search'
import Logo from '@/components/shared/logo'
import { Menu } from 'lucide-react'
import clsx from 'clsx'

const { header, container, logoContainer, toggleSidebar, searchInput } =
  headerStyles

const Header = () => {
  return (
    <header className={clsx(header)}>
      <div className={clsx(container)}>
        <div className={clsx(logoContainer)}>
          <Logo />
          <Menu
            style={{ cursor: 'pointer', color: '#2f65b9' }}
            className={clsx(toggleSidebar)}
          />
        </div>

        <Search
          placeholder='Search for people or groups...'
          classNames={clsx(searchInput)}
        />
        <Account />
      </div>
    </header>
  )
}

export default Header
