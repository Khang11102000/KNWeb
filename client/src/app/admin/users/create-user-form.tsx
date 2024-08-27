'use client'

import { addNewUserAction } from '@/actions/admin/user-action'
import { RULES } from '@/constants/messages'
import { AddNewUserTypes } from '@/types/user-type'
import { Form, Input, Modal, notification, Select } from 'antd'
import React from 'react'

interface CreateUserFormProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateUserForm = ({ isOpen, setIsOpen }: CreateUserFormProps) => {
  const [form] = Form.useForm()

  const handleChange = (value: string) => {
    console.log(`selected ${value}`)
  }

  const handleCancelAddNewUser = () => {
    setIsOpen(false)
    form.resetFields()
  }

  const handleAddNewUser = async (values: AddNewUserTypes) => {
    const payload = {
      ...values,
      photo: null,
      role: {
        id: values.role
      },
      status: {
        id: values.status
      }
    }

    try {
      const res = await addNewUserAction(payload)

      if (res?.status === 422) {
        const fields = []
        for (let name in res?.errors) {
          fields.push({
            name,
            errors: [res.errors[name]]
          })
        }
        form.setFields([...fields])
      } else {
        notification.success({
          message: 'Success',
          description: 'Add new user is successfully'
        })
        form.resetFields()
        setIsOpen(false)
      }
    } catch (error: any) {}
  }

  return (
    <Modal
      title='Add New User'
      open={isOpen}
      onCancel={() => handleCancelAddNewUser()}
      onOk={() => form.submit()}
      okText='Save'
    >
      <Form layout='vertical' form={form} onFinish={handleAddNewUser}>
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
          <Input />
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

        <Form.Item
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
        </Form.Item>

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
            onChange={handleChange}
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
            onChange={handleChange}
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

export default CreateUserForm
