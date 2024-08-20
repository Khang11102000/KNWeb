'use client'

import Button from '@/components/button'
import Input from '@/components/input'
import { message, regex, regexMessage } from '@/constants/validate'
import authService from '@/services/auth-service'
import { LoginBodyType } from '@/types/auth'
import { clientToken } from '@/utils/http'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const LoginForm = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginBodyType>()

  // Handle Login
  const onSubmit = async (data: LoginBodyType) => {
    try {
      const payload = { ...data }

      // Call API Login
      const res = await authService.login(payload)

      // Save token to client
      const token = res?.data || {}
      clientToken.value = JSON.stringify(token)

      // Set access token on Next Server
      await authService.authFromNextServer(token)

      // Get profile
      // handleGetProfile()

      // Notification
      toast.success(res.message || 'Login is successfully.')

      router.push('/')
    } catch (error: any) {
      const errorMessage = error?.data?.message
      toast.error(errorMessage || 'Login failed. Please try again.')
    }
  }

  return (
    <form className='min-w-[263px] mt-16' onSubmit={handleSubmit(onSubmit)}>
      <Input
        label='Email'
        id='email'
        placeholder='Enter your email...'
        {...register('email', {
          required: message.EMAIL,
          pattern: {
            value: regex.EMAIL,
            message: regexMessage.EMAIL
          }
        })}
        error={errors.email?.message}
      />

      <Input
        label='Password'
        type='password'
        id='password'
        placeholder='Enter your password...'
        containerStyle='mt-4'
        {...register('password', {
          required: message.PASSWORD,
          minLength: {
            value: 6,
            message: message.MIN_LENGTH_PASSWORD
          }
        })}
        error={errors.password?.message}
      />
      <Button className='mt-6 w-full' type='submit'>
        Login
      </Button>
    </form>
  )
}

export default LoginForm
