'use client'
import DropdownMenu from '@/app/(user)/_components/account/dropdown-menu'
import { Avatar, Skeleton } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import accountStyles from './account.module.scss'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import { IUser } from '@/types/user-type'
import authService from '@/services/auth-service'

const { accountWrapper } = accountStyles

const Account = () => {
  const [openDropdownMenu, setOpenDropdownMenu] = useState<boolean>(false)
  const accountDropdownRef = useRef<HTMLDivElement>(null)
  const { data: session, status } = useSession()
  const [me, setMe] = useState<IUser | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const handleToggleDropdownMenu = (
    e?: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e?.stopPropagation()
    setOpenDropdownMenu((prev) => !prev)
  }

  const handleCloseDropdownMenu = () => {
    setOpenDropdownMenu(false)
  }

  const fetchMe = async (accessToken: string) => {
    try {
      const res = (await authService.getMe(accessToken)) as IUser
      if (res.id) {
        setMe(res)
      }
    } catch (error) {
      console.log('🚀error---->', error)
      setMe(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const handleEventClick = (e: MouseEvent) => {
      if (!accountDropdownRef.current?.contains(e.target as Node)) {
        handleCloseDropdownMenu()
      }
    }

    if (typeof window !== undefined) {
      window.addEventListener('click', handleEventClick)
    }

    return () => window.removeEventListener('click', handleEventClick)
  }, [])

  useEffect(() => {
    if (status === 'authenticated') {
      fetchMe(session.token)
    }
  }, [session?.token, status])

  if (status === 'loading') {
    return <Skeleton.Avatar active size={44} />
  }

  if (status === 'authenticated') {
    return (
      <div className={clsx(accountWrapper)}>
        <Avatar
          size={44}
          src={
            `${me?.photo}` ||
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
          onClick={handleToggleDropdownMenu}
          style={{ cursor: 'pointer' }}
        />
        {openDropdownMenu && (
          <DropdownMenu data={me} ref={accountDropdownRef} />
        )}
      </div>
    )
  }
}

export default Account
