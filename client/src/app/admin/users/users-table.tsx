'use client'

import React, { useState } from 'react'
import {
  Button,
  Flex,
  notification,
  Popconfirm,
  Space,
  Table,
  Tag,
  Typography
} from 'antd'
import type { TableProps } from 'antd'
import { PlusOutlined, EditTwoTone, DeleteTwoTone } from '@ant-design/icons'
import { IUser, UserStatusEnum } from '@/types/user-type'
import CreateUserForm from '@/app/admin/users/create-user-form'
import { ADMIN_ROLE } from '@/constants/role'
import EditUserForm from '@/app/admin/users/edit-user-form'
import { deleteUserAction } from '@/actions/admin/user-action'
// import DeleteUserForm from '@/app/admin/users/delete-user-form'

const { Title } = Typography

interface UserTableProps {
  users: IUser[]
}

const UsersTable = ({ users }: UserTableProps) => {
  const [openCreateUserForm, setOpenCreateUserForm] = useState<boolean>(false)
  const [openEditUserForm, setOpenEditUserForm] = useState<boolean>(false)
  const [openDeleteUserForm, setOpenDeleteUserForm] = useState<boolean>(false)
  const [dataEditUser, setDataEditUser] = useState<IUser | null>(null)

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
        const color = status.id === ADMIN_ROLE.code ? 'green' : 'red'
        const text =
          status.id === UserStatusEnum.ACTIVED ? 'Actived' : 'Inactived'
        return <Tag color={color}>{text}</Tag>
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        return (
          <Space size='middle'>
            <EditTwoTone
              twoToneColor='#f57800'
              style={{ cursor: 'pointer' }}
              onClick={(e) => {
                e.stopPropagation()
                setOpenEditUserForm(true)
                setDataEditUser(record)
              }}
            />

            <Popconfirm
              title='Delete user'
              description='Are you sure to delete this user'
              onConfirm={() => {
                if (record.id) {
                  handleDeleteUser(record.id)
                }
              }}
              onCancel={() => console.log('cancel')}
              okText='Confirm'
              cancelText='Cancel'
              placement='rightTop'
            >
              <DeleteTwoTone
                twoToneColor='#FF0000'
                style={{ cursor: 'pointer' }}
              />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]

  const renderHeader = () => {
    return (
      <Flex align='center' justify='space-between'>
        <Title>List Users</Title>
        <Button
          icon={<PlusOutlined />}
          type='primary'
          onClick={() => setOpenCreateUserForm(true)}
        >
          Add User
        </Button>
      </Flex>
    )
  }

  const handleDeleteUser = async (id: string) => {
    const res = (await deleteUserAction(id)) as {
      statusCode: number
      message: string
    }

    if (res?.statusCode === 204) {
      notification.success({
        message: 'Success',
        description: `Delete user with id = ${id} is successfully`
      })
    } else {
      notification.success({
        message: 'Error',
        description: `Delete user with id = ${id} is failed`,
        placement: 'bottomRight'
      })
    }
  }

  return (
    <>
      <Table
        title={renderHeader}
        columns={columns}
        dataSource={users}
        rowKey='id'
      />

      <CreateUserForm
        isOpen={openCreateUserForm}
        setIsOpen={setOpenCreateUserForm}
      />

      <EditUserForm
        isOpen={openEditUserForm}
        setIsOpen={setOpenEditUserForm}
        user={dataEditUser}
      />
    </>
  )
}

export default UsersTable
