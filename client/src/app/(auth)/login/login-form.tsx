'use client'

import { RULES } from '@/constants/messages'
import { PRIVATE_ROUTES } from '@/constants/routes'
import type { FormProps } from 'antd'
import { Button, Form, Input, notification } from 'antd'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type FieldType = {
  email: string
  password: string
  // remember?: string
}

const LoginForm = () => {
  // Init
  const router = useRouter()

  // Events Handler
  // Handle Login
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      const res = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false
      })

      if (!res?.ok) {
        throw new Error(res?.error || 'Something went wrong')
      } else {
        // Login Succeed -> Redirect To admin/dashboard
        notification.success({
          message: 'Successfully',
          description: 'Login is successfully',
          placement: 'bottomRight'
        })
        router.push(PRIVATE_ROUTES.ADMIN.DASHBOARD)
      }
    } catch (error: any) {
      notification.error({
        message: 'Error',
        description: error?.message,
        placement: 'bottomRight'
      })
    }
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
      // style={{ maxWidth: 600, marginTop: 30 }}
      // initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
      className='login-form'
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

      <Form.Item>
        <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
          Login
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
