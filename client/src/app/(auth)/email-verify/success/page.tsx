'use client'
import { PUBLIC_ROUTES } from '@/constants/routes'
import { green } from '@ant-design/colors'
import { CheckCircleFilled } from '@ant-design/icons'
import { Button, Flex, Typography } from 'antd'
import Link from 'next/link'

const { Title } = Typography

const EmailVerifySuccessPage = () => {
  return (
    <Flex vertical align='center' justify='center'>
      <CheckCircleFilled style={{ fontSize: 80, color: `${green.primary}` }} />
      <Title>Email Verified</Title>
      <Button type='primary'>
        <Link href={PUBLIC_ROUTES.LOGIN}>Go to login</Link>
      </Button>
    </Flex>
  )
}

export default EmailVerifySuccessPage
