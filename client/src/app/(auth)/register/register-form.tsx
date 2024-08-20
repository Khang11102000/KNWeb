'use client'

import Button from '@/components/button'
import Input from '@/components/input'
import envConfig from '@/config/environment'
import { message, regex, regexMessage } from '@/constants/validate'
import authService from '@/services/auth-service'
import { RegisterBodyType } from '@/types/auth'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterBodyType>()

  // Handle Register
  const onSubmit = async (data: RegisterBodyType) => {
    const payload = { ...data }

    try {
      const res = await authService.register(payload)
      toast.success(res.message || 'Register is successfully. Please login.')
    } catch (error: any) {
      toast.error(error?.data?.message)
    }
  }

  return (
    <form className='mt-16' onSubmit={handleSubmit(onSubmit)}>
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
        containerStyle='mt-4'
        label='Username'
        id='username'
        placeholder='Enter your username...'
        {...register('username', {
          required: message.USERNAME,
          minLength: {
            value: 6,
            message: message.MIN_LENGTH_USERNAME
          }
        })}
        error={errors.username?.message}
      />

      <Input
        containerStyle='mt-4'
        label='Password'
        type='password'
        id='password'
        {...register('password', {
          required: message.PASSWORD,
          minLength: {
            value: 6,
            message: message.MIN_LENGTH_PASSWORD
          }
        })}
        placeholder='Enter your password...'
        error={errors.password?.message}
      />
      <Button className='mt-6 w-full' type='submit'>
        Register
      </Button>
    </form>
  )
}

export default RegisterForm
