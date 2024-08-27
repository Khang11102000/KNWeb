'use client'

import React from 'react'
import { Button, Space, Table, Tag } from 'antd'
import type { TableProps } from 'antd'
import { IUser } from '@/types/user-type'

const columns: TableProps<IUser>['columns'] = [
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName'
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName'
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    render: (_, { role }) => {
      let roleName = role.id === '1' ? 'Admin' : 'User'
      return <Tag>{roleName}</Tag>
    }
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (_, { status }) => {
      const color = status.id === '1' ? 'green' : 'red'
      const text = status.id === '1' ? 'Active' : 'Inactive'
      return <Tag color={color}>{text}</Tag>
    }
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => {
      return (
        <Space size='middle'>
          <Button type='primary'>Edit</Button>
          <Button>Delete</Button>
        </Space>
      )
    }
  }
]

interface UserTableProps {
  users: IUser[]
}

const UsersTable = ({ users }: UserTableProps) => {
  return <Table columns={columns} dataSource={users} rowKey='id' />
}

export default UsersTable
