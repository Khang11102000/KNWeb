'use client'
import { PUBLIC_ROUTES } from '@/constants/routes'
import { green } from '@ant-design/colors'
import { CheckCircleFilled } from '@ant-design/icons'
import { Button, Typography } from 'antd'
import Link from 'next/link'
import styles from './email-verify-success.module.scss'
import clsx from 'clsx'

const { emailVerifySuccessPage, container } = styles

const { Title } = Typography

const EmailVerifySuccessPage = () => {
  return (
    <div className={clsx(emailVerifySuccessPage)}>
      <div className={clsx(container)}>
        <CheckCircleFilled
          style={{ fontSize: 80, color: `${green.primary}` }}
        />
        <Title>Email Verified</Title>
        <Button type='primary'>
          <Link href={PUBLIC_ROUTES.LOGIN}>Go to login</Link>
        </Button>
      </div>
    </div>
  )
}

export default EmailVerifySuccessPage
