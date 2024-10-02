import LoginForm from '@/app/(auth)/login/login-form'
import Logo from '@/components/shared/logo'
import './login-page.scss'

const LoginPage = () => {
  return (
    <div className='login-page'>
      <div className='text-box'>
        <Logo />
        <p className='description'>
          Welcome to KNWeb, a platform to connect with the social world
        </p>
      </div>
      <LoginForm />
    </div>
  )
}

export default LoginPage
