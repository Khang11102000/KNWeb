'use client'
import { RULES } from '@/constants/messages'
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '@/constants/routes'
import { ILoginPayload } from '@/types/auth-type'
import { UserStatusEnum } from '@/types/user-type'
import type { FormProps } from 'antd'
import { Button, Flex, Form, Input, message, notification, Spin } from 'antd'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const LoginForm = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  // Handle Login
  const onFinish: FormProps<ILoginPayload>['onFinish'] = async (values) => {
    setLoading(true)
    try {
      const res = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false
      })

      if (!res?.error) {
        message.success('Login is successfully')
        router.push(PRIVATE_ROUTES.ADMIN.DASHBOARD)
      } else {
        throw res.error
      }
    } catch (error: any) {
      const errorData = JSON.parse(error)

      if (errorData?.userStatus === UserStatusEnum.INACTIVED) {
        message.error(errorData?.message)

        // Redirect To Email Verify Page
        router.push(PUBLIC_ROUTES.EMAIL_VERIFY)
      } else {
        message.error('Login Failed')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Spin spinning={loading}>
      <Form
        layout='vertical'
        onFinish={onFinish}
        autoComplete='off'
        className='login-form'
      >
        <Form.Item
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

        <Form.Item
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
          <Button
            type='primary'
            htmlType='submit'
            style={{ width: '100%', marginTop: 20 }}
          >
            Login
          </Button>
        </Form.Item>

        <Flex justify='center' align='center' gap={4}>
          <span>Do not have an account?</span>
          <Link href={PUBLIC_ROUTES.REGISTER}>Register</Link>
        </Flex>
      </Form>
    </Spin>
  )
}

export default LoginForm
