import LoginForm from '@/app/(auth)/login/login-form'
import { Flex } from 'antd'
import Image from 'next/image'
import './LoginPage.scss'

const LoginPage = () => {
  return (
    <div className='login-page'>
      <Flex align='center' justify='center'>
        <Image
          src='/img/logo-instagram.svg'
          alt='Logo Instagram'
          width={102}
          height={28}
        />
        <h1 className='hidden'>Instagram</h1>
      </Flex>
      <LoginForm />
    </div>
  )
}

export default LoginPage
