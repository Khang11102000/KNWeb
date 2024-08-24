'use client'

import { RULES } from '@/constants/messages'
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '@/constants/routes'
import { UserStatusEnum } from '@/types/user-type'
import type { FormProps } from 'antd'
import { Button, Form, Input, notification } from 'antd'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type FieldType = {
  email: string
  password: string
}

const LoginForm = () => {
  const router = useRouter()

  // Handle Login
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      const res = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false
      })

      if (res?.error) {
        throw res.error
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
      const errorData = JSON.parse(error)

      if (errorData?.userStatus === UserStatusEnum.INACTIVED) {
        notification.error({
          message: 'Error',
          description: errorData?.message,
          placement: 'bottomRight'
        })

        // Redirect To Email Verify Page
        router.push(PUBLIC_ROUTES.EMAIL_VERIFY)
      } else {
        notification.error({
          message: 'Error',
          description: 'Login Failed',
          placement: 'bottomRight'
        })
      }
    }
  }

  return (
    <Form
      layout='vertical'
      labelCol={{ span: 8 }}
      onFinish={onFinish}
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

      <Form.Item>
        <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
          Login
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
