'use client'
import Logo from '@/components/shared/logo'
import { RULES } from '@/constants/messages'
import { ADMIN_ROLE, USER_ROLE } from '@/constants/role'
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '@/constants/routes'
import authService from '@/services/auth-service'
import { ILoginPayload } from '@/types/auth-type'
import { RoleEnum, UserStatusEnum } from '@/types/user-type'
import type { FormProps } from 'antd'
import { Button, Flex, Form, Input, message, notification, Spin } from 'antd'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const LoginForm = () => {
  const router = useRouter()
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { data: session, status } = useSession()

  const handleLogin = async (values: ILoginPayload) => {
    setIsLoading(true)
    const { email, password } = values || {}
    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (!res?.error) {
        message.success('Login is successfully')
        router.push
      } else {
        throw res.error
      }
    } catch (error: any) {
      const errorData = JSON.parse(error)

      if (errorData?.userStatus === UserStatusEnum.INACTIVED) {
        message.error(errorData?.message)

        // const confirmEmailRes = await authService.confirmEmail()

        // // Redirect To Email Verify Page
        // router.push(PUBLIC_ROUTES.EMAIL_VERIFY)
      } else {
        message.error('Login Failed')
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (status === 'authenticated') {
      if (!!session?.token && Object.keys(session?.user).length > 0) {
        router.push(
          `${
            session.user.role.id === RoleEnum.ADMIN ? '/admin/dashboard' : '/'
          } `
        )
      }
    }
  }, [session, router, status])

  return (
    <Spin spinning={isLoading}>
      <div className='text-box'>
        <Logo />
        <p className='description'>
          Welcome to KNWeb, a platform to connect with the social world
        </p>
      </div>
      <Form
        layout='vertical'
        onFinish={handleLogin}
        autoComplete='off'
        className='login-form'
        form={form}
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
          <span>{`Don't have an account?`}</span>
          <Link href={PUBLIC_ROUTES.REGISTER}>Register</Link>
        </Flex>
      </Form>
    </Spin>
  )
}

export default LoginForm
