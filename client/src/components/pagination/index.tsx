// 'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  containerStyles?: string
  page?: number
  limit?: number
  total: number
}

const PAGE_STEP = 1

const Pagination = ({
  page = 1,
  limit = 1,
  total = 0,
  containerStyles
}: Props) => {
  const totalPage = () => {
    if (!limit || !total) return 1

    return Math.ceil(Number(total) / Number(limit)) || 1
  }

  const pageList = () => {
    let start = page - PAGE_STEP
    let end = page + PAGE_STEP
    const pageSize = totalPage()

    if (start <= 0) {
      start = 1
      end = start + PAGE_STEP * 2
      if (end > pageSize) {
        end = pageSize
      }
    }

    if (end >= pageSize) {
      end = pageSize
      start = end - PAGE_STEP * 2
      if (start < 1) {
        start = 1
      }
    }

    const list = []
    for (let i = start; i <= end; i++) {
      list.push(i)
    }

    return list
  }

  return (
    <ul className={twMerge('flex items-center gap-2', containerStyles)}>
      <PagiItem
        className='px-6 w-fit'
        path={`?page=${page - 1}&limit=${limit}`}
        isDisabled={page === 1}
      >
        Previous
      </PagiItem>
      {pageList().map((item, index) => {
        return (
          <PagiItem
            key={index}
            isActive={item === page}
            path={`?page=${item}&limit=${limit}`}
          >
            {item}
          </PagiItem>
        )
      })}
      <PagiItem
        className='px-6 w-fit'
        path={`?page=${page + 1}&limit=${limit}`}
        isDisabled={page === totalPage()}
      >
        Next
      </PagiItem>
    </ul>
  )
}

type PagiItemProps = ComponentProps<'a'> &
  ComponentProps<'div'> & {
    children: ReactNode
    className?: string
    isDisabled?: boolean
    isActive?: boolean
    path: string
  }

const PagiItem = ({
  children,
  className,
  isDisabled = false,
  isActive = false,
  path = '',
  ...restProps
}: PagiItemProps) => {
  return (
    <li>
      {!isDisabled ? (
        <Link
          href={path}
          className={twMerge(
            clsx(
              'flex items-center justify-center w-8 h-8 bg-primary text-white cursor-pointer',
              className,
              {
                'text-sunshine-yellow': isActive
              }
            )
          )}
          {...restProps}
        >
          {children}
        </Link>
      ) : (
        <div
          className={twMerge(
            clsx(
              'flex items-center justify-center w-8 h-8 bg-primary text-white cursor-pointer',
              className,
              {
                'text-shade-400 bg-shade-200 cursor-not-allowed': isDisabled
              }
            )
          )}
          {...restProps}
        >
          {children}
        </div>
      )}
    </li>
  )
}

export default Pagination
