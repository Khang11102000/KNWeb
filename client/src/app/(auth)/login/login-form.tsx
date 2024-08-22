'use client'

import React from 'react'
import type { FormProps } from 'antd'
import { Button, Checkbox, Form, Input } from 'antd'
import { RULES } from '@/constants/messages'

type FieldType = {
  email: string
  password: string
  // remember?: string
}

const LoginForm = () => {
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values)
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      layout='vertical'
      labelCol={{ span: 8 }}
      style={{ maxWidth: 600, marginTop: 30 }}
      // initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      <Form.Item<FieldType>
        label='Email'
        name='email'
        rules={[
          { required: true, message: RULES.email.required.message },
          {
            pattern: RULES.email.regex.pattern,
            message: RULES.email.regex.message
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label='Password'
        name='password'
        rules={[
          { required: true, message: RULES.password.required.message },
          {
            min: RULES.password.minLength.length,
            message: RULES.password.minLength.message
          }
        ]}
      >
        <Input.Password />
      </Form.Item>

      {/* <Form.Item<FieldType>
        name='remember'
        valuePropName='checked'
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}

      <Button
        type='primary'
        htmlType='submit'
        style={{ width: '100%', marginTop: 30 }}
      >
        Login
      </Button>
    </Form>
  )
}

export default LoginForm
