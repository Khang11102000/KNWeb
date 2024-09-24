'use client'

import { RULES } from '@/constants/messages'
import { PUBLIC_ROUTES } from '@/constants/routes'
import authService from '@/services/auth-service'
import { IRegisterPayload } from '@/types/auth-type'
import { Button, Checkbox, Flex, Form, Input, message } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const RegisterForm = () => {
  const [form] = Form.useForm()
  const router = useRouter()

  // Handle Register
  const onFinish = async (values: IRegisterPayload) => {
    // Call api register
    try {
      const payload = {
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        photo:
          'https://media.istockphoto.com/id/619400810/photo/mr-who.webp?a=1&b=1&s=612x612&w=0&k=20&c=6cz9uumveIOesURahritB_WaN5aIkKy1lAOp_1VfBX8='
      }

      const res = await authService.register(payload)

      if (res?.status === 422) {
        throw res?.errors
      } else {
        message.success('Register is successfully')
        router.push(PUBLIC_ROUTES.LOGIN)
      }
    } catch (error: any) {
      message.error(error?.email || 'Register Failed. Please try again')
    }
  }

  return (
    <Form
      layout='vertical'
      onFinish={onFinish}
      autoComplete='off'
      className='register-form'
      form={form}
    >
      <Form.Item
        label='Email'
        name='email'
        hasFeedback
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
        label='First Name'
        name='firstName'
        hasFeedback
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
        hasFeedback
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
        hasFeedback
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

      <Form.Item
        label='Confirm Password'
        name='confirmPassword'
        dependencies={['password']}
        hasFeedback
        rules={[
          { required: true, message: RULES.password.required.message },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(
                new Error('The new password that you entered do not match!')
              )
            }
          })
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name='agreement'
        valuePropName='checked'
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error('Should accept agreement'))
          }
        ]}
      >
        <Checkbox>
          I have read the <a href=''>agreement</a>
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
          Register
        </Button>
      </Form.Item>

      <Flex justify='center' align='center' gap={4}>
        <span>Already have an account?</span>
        <Link href={PUBLIC_ROUTES.LOGIN}>Login</Link>
      </Flex>
    </Form>
  )
}

export default RegisterForm
