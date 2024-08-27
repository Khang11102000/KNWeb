'use client'
import { Breadcrumb } from 'antd'
import { ReactNode } from 'react'

interface CustomBreadCrumbProps {
  items: {
    title: ReactNode
  }[]
}

const CustomBreadCrumb = ({ items = [] }: CustomBreadCrumbProps) => {
  return <Breadcrumb items={items} />
}

export default CustomBreadCrumb
