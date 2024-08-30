'use client'
import DropdownMenu from '@/app/(user)/_components/account/dropdown-menu'
import { Avatar } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import accountStyles from './account.module.scss'
import clsx from 'clsx'

const { accountWrapper } = accountStyles

const Account = () => {
  const [openDropdownMenu, setOpenDropdownMenu] = useState<boolean>(false)
  console.log('🚀openDropdownMenu---->', openDropdownMenu)
  const accountDropdownRef = useRef<HTMLDivElement>(null)

  const handleToggleDropdownMenu = (
    e?: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e?.stopPropagation()
    setOpenDropdownMenu((prev) => !prev)
  }

  const handleCloseDropdownMenu = () => {
    setOpenDropdownMenu(false)
  }

  useEffect(() => {
    const handleEventClick = (e: MouseEvent) => {
      if (!accountDropdownRef.current?.contains(e.target as Node)) {
        handleCloseDropdownMenu()
      }
    }

    window.addEventListener('click', handleEventClick)

    return () => window.removeEventListener('click', handleEventClick)
  }, [])

  return (
    <div className={clsx(accountWrapper)}>
      <Avatar
        size={44}
        src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        onClick={handleToggleDropdownMenu}
        style={{ cursor: 'pointer' }}
      />
      {openDropdownMenu && <DropdownMenu ref={accountDropdownRef} />}
    </div>
  )
}

export default Account
