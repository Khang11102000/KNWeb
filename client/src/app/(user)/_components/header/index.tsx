'use client'
import Account from '@/app/(user)/_components/account'
import Logo from '@/components/shared/logo'
import { Menu } from 'lucide-react'
import clsx from 'clsx'
import SearchInput from '@/components/shared/search-input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { PRIVATE_ROUTES } from '@/constants/routes'
import headerStyles from './header.module.scss'

const { header, container, logoContainer, toggleSidebar, searchInput } =
  headerStyles

interface IHeaderProps {
  classNames?: string
  headerContainerClassNames?: string
  logoClassNames?: string
}

const Header = ({
  classNames,
  logoClassNames,
  headerContainerClassNames
}: IHeaderProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

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
    <header className={clsx(header, classNames)}>
      <div className={clsx(container, headerContainerClassNames)}>
        <div className={clsx(logoContainer, logoClassNames)}>
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
