'use client'

import Link from 'next/link'
import { RxDashboard } from 'react-icons/rx'
import { LuUsers2 } from 'react-icons/lu'
import classNames from 'classnames'
import { usePathname } from 'next/navigation'
import { paths } from '@/constants/path'

const menuList = [
  {
    icon: <RxDashboard />,
    link: '/admin/dashboard',
    text: 'Dashboard'
  },
  {
    icon: <LuUsers2 />,
    link: '/admin/users',
    text: 'User'
  }
]

const Menu = () => {
  const pathname = usePathname()

  return (
    <nav className='flex flex-col gap-3'>
      {menuList.map((item, index) => (
        <Link
          key={index}
          href={item.link}
          className={classNames(
            'w-full flex items-center gap-3 text-primary px-4 py-2 rounded-md bg-opacity-15 hover:bg-primary hover:bg-opacity-15 transition-all',
            {
              'bg-primary': pathname === item.link
            }
          )}
        >
          {item.icon}
          <span>{item.text}</span>
        </Link>
      ))}
    </nav>
  )
}

export default Menu
