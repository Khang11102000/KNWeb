'use client'

import Account from '@/app/(user)/_components/account'
import headerStyles from './header.module.scss'
import Logo from '@/components/shared/logo'
import { Menu } from 'lucide-react'
import clsx from 'clsx'
import SearchInput from '@/components/shared/search-input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { PRIVATE_ROUTES } from '@/constants/routes'

const { header, container, logoContainer, toggleSidebar, searchInput } =
  headerStyles

const Header = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const handleSearch = (keyword: string) => {
    const params = new URLSearchParams(searchParams)

    if (keyword) {
      params.set('q', keyword)
    } else {
      params.delete('q')
    }

    router.push(`/search/posts?${params.toString()}`)
  }

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

        <SearchInput
          placeholder='Search for people or groups...'
          classNames={clsx(searchInput)}
          onSearch={handleSearch}
        />

        <Account />
      </div>
    </header>
  )
}

export default Header
