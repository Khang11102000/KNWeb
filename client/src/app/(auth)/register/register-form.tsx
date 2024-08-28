'use client'

import { RULES } from '@/constants/messages'
import { PUBLIC_ROUTES } from '@/constants/routes'
import authService from '@/services/auth-service'
import { IRegisterPayload } from '@/types/auth-type'
import { Button, Checkbox, Flex, Form, Input } from 'antd'
import Link from 'next/link'

const RegisterForm = () => {
  const [form] = Form.useForm()

  // Handle Login
  const onFinish = async (values: IRegisterPayload) => {
    // Call api register
    try {
      const payload = {
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName
      }

      const res = await authService.register(payload)
      console.log('🚀res---->', res)
    } catch (error) {
      console.log('🚀error---->', error)
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
