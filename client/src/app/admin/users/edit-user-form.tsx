'use client'

import { editUserAction } from '@/actions/admin/user-action'
import { RULES } from '@/constants/messages'
import { EditUserTypes, IUser } from '@/types/user-type'
import { Form, Input, Modal, notification, Select } from 'antd'
import React, { useEffect } from 'react'

interface EditUserFormProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  user: IUser | null
}

const EditUserForm = ({ isOpen, setIsOpen, user }: EditUserFormProps) => {
  const [form] = Form.useForm()

  const handleCancelEditUser = () => {
    setIsOpen(false)
  }

  const handleEditUser = async (values: EditUserTypes) => {
    const { firstName, lastName, role, status } = values
    const payload = {
      firstName,
      lastName,
      role: {
        id: role
      },
      status: {
        id: status
      }
    } as IUser

    if (user?.id) {
      const res = (await editUserAction(user?.id, payload)) as IUser
      setIsOpen(false)
      notification.success({
        message: 'Success',
        description: `User with email = ${res.email} updated is successfully`,
        placement: 'bottomRight'
      })
    } else {
      notification.error({
        message: 'Error',
        description: 'Update user is failed. Please try again',
        placement: 'bottomRight'
      })
    }
  }

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      form.setFieldsValue({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        role: user.role.id,
        status: user.status.id
      })
    }
  }, [user, form])

  return (
    <Modal
      title='Edit User'
      open={isOpen}
      onCancel={() => handleCancelEditUser()}
      onOk={() => form.submit()}
      okText='Save'
    >
      <Form layout='vertical' form={form} onFinish={handleEditUser}>
        <Form.Item
          label='Email'
          name='email'
          rules={[
            {
              required: true,
              message: RULES.email.required.message
            },
            {
              pattern: RULES.email.regex.pattern,
              message: RULES.email.regex.message
            }
          ]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label='First Name'
          name='firstName'
          rules={[
            {
              required: true,
              message: RULES.firstName.required.message
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Last Name'
          name='lastName'
          rules={[
            {
              required: true,
              message: RULES.lastName.required.message
            }
          ]}
        >
          <Input />
        </Form.Item>

        {/* <Form.Item
          label='Password'
          name='password'
          rules={[
            {
              required: true,
              message: RULES.password.required.message
            },
            {
              min: RULES.password.minLength.length,
              message: RULES.password.minLength.message
            }
          ]}
        >
          <Input type='password' />
        </Form.Item> */}

        <Form.Item
          label='Role'
          name='role'
          initialValue='2'
          rules={[
            {
              required: true,
              message: RULES.role.required.message
            }
          ]}
        >
          <Select
            options={[
              { value: '1', label: 'Admin' },
              { value: '2', label: 'User' }
            ]}
          />
        </Form.Item>

        <Form.Item
          label='Status'
          name='status'
          initialValue='2'
          rules={[
            {
              required: true,
              message: RULES.role.required.message
            }
          ]}
        >
          <Select
            options={[
              { value: '1', label: 'Actived' },
              { value: '2', label: 'Inactive' }
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditUserForm
