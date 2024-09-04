'use client'

import clsx from 'clsx'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { MouseEvent, ReactNode, useEffect, useState } from 'react'
import styles from './sidebar.module.scss'

const {
  sidebarItem,
  sidebarWithSubItem,
  content,
  active,
  chevronDown,
  up,
  sidebarSubItemList
} = styles

interface ISubMenu {
  text: string
  icon?: ReactNode
  path: string
}

interface ISidebarItemProps {
  text: string
  icon?: ReactNode
  path: string
  subMenu?: ISubMenu[]
}

const SidebarItem = ({ path, text, icon, subMenu = [] }: ISidebarItemProps) => {
  const [expended, setExpended] = useState<boolean>(false)
  const pathname = usePathname()

  const handleToggleSubMenu = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setExpended(!expended)
  }

  useEffect(() => {
    const sidebarSubItemList = document.querySelectorAll<HTMLElement>(
      '.sidebar_sidebarSubItemList__GdCXy'
    )

    sidebarSubItemList.forEach((item, index) => {
      const subItemInner = item.querySelector('.subitem-inner')
      if (expended) {
        item.style.height = `${subItemInner?.scrollHeight}px`
      } else {
        item.style.height = '0px'
      }
    })
  }, [expended])

  return subMenu.length > 0 ? (
    <>
      <li
        className={clsx('sidebar-item', {
          [active]: expended
        })}
      >
        <div className={clsx(sidebarWithSubItem)} onClick={handleToggleSubMenu}>
          <div className={clsx(content)}>
            {icon} <span>{text}</span>
          </div>
          <ChevronDown
            className={clsx(chevronDown, {
              [up]: expended
            })}
          />
        </div>

        <ul className={clsx(sidebarSubItemList)}>
          <div className='subitem-inner'>
            {subMenu.map((item, index) => {
              return (
                <li key={item.path || index}>
                  <Link href={item.path} className={clsx(sidebarItem)}>
                    {item.text}
                  </Link>
                </li>
              )
            })}
          </div>
        </ul>
      </li>
    </>
  ) : (
    <li>
      <Link
        href={path}
        className={clsx(sidebarItem, {
          [active]: path === pathname
        })}
      >
        {icon} {text}
      </Link>
    </li>
  )
}

export default SidebarItem
