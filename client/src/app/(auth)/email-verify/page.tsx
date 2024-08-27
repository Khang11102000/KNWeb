import EmailVerifyForm from '@/app/(auth)/email-verify/email-verify-form'
import './email-verify-page.scss'

const EmailVerifyPage = () => {
  return (
    <div className='email-verify-page'>
      <h1>Active Your Account</h1>
      <p>
        Code verify account sent to your email. Please, check your email
        address.
      </p>
      <EmailVerifyForm />
    </div>
  )
}

export default EmailVerifyPage
