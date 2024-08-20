'use client'

import Input from '@/components/input'
import accountService from '@/services/account-service'
import authService from '@/services/auth-service'
import { TokenTypes } from '@/types/auth'
import classNames from 'classnames'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Props = {
  type?: 'admin' | 'user'
}

const Header = ({ type = 'user' }: Props) => {
  const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false)

  const showDropdownMenu = () => {
    setIsShowDropdown(!isShowDropdown)
  }

  const handleLogout = async () => {
    await authService.logoutFromNextClientToNextServer()
  }

  if (type === 'admin') {
    return (
      <header className='h-16 fixed top-0 right-0 bg-red-500 w-[calc(100%-300px)] text-white flex items-center justify-between px-4'>
        {/* Input search */}
        <Input placeholder='Search...' containerStyle='w-[300px]' />
        {/* User */}
        <div className='relative cursor-pointer'>
          {/* Avatar */}
          <div
            className='flex items-center w-10 h-10 rounded-full overflow-hidden'
            onClick={showDropdownMenu}
          >
            <Image
              src='/img/avatar-01.jpg'
              alt='Avatar'
              objectFit='cover'
              fill
              sizes='100vw'
            />
          </div>
          {/* Dropdown */}
          <ul
            className={classNames('absolute top-full w-[250px] bg-black', {
              block: isShowDropdown,
              hidden: !isShowDropdown
            })}
          >
            <li>
              <Link href='/' onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </header>
    )
  }

  return <header>Header User</header>
}

export default Header
