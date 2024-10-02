'use client'
import HTTP_STATUS_CODES from '@/constants/http-status-codes'
import { RULES } from '@/constants/messages'
import { PUBLIC_ROUTES } from '@/constants/routes'
import authService from '@/services/auth-service'
import { IEmailConfirmPayload } from '@/types/auth-type'
import { Button, Form, Input, Spin } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const EmailVerifyForm = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const hashCode = searchParams.get('hash')

  const handleConfirm = async (values: IEmailConfirmPayload) => {
    setLoading(true)
    try {
      const payload = { ...values }

      if (hashCode) {
        const res = await authService.confirmEmail(payload)
        if (res?.status === HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY.statusCode) {
          form.setFields([
            {
              name: 'hash',
              errors: ['Code invalid']
            }
          ])
        } else {
          router.push(PUBLIC_ROUTES.EMAIL_VERIFY_SUCCESS)
        }
      }
    } catch (error) {
      console.log('🚀error---->', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (hashCode) {
      form.setFieldValue('hash', hashCode)
    }
  }, [hashCode, form])

  return (
    <Spin spinning={loading}>
      <Form
        layout='vertical'
        autoComplete='off'
        onFinish={handleConfirm}
        form={form}
      >
        <Form.Item
          label='Code'
          name='hash'
          rules={[
            {
              required: true,
              message: RULES.hash.required.message
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
          Confirm
        </Button>
      </Form>
    </Spin>
  )
}

export default EmailVerifyForm
