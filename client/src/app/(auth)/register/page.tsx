import RegisterForm from '@/app/(auth)/register/register-form'
import './register-page.scss'

const RegisterPage = () => {
  return (
    <div className='register-page'>
      <h1 style={{ textAlign: 'center' }}>Register</h1>
      <RegisterForm />
    </div>
  )
}

export default RegisterPage
