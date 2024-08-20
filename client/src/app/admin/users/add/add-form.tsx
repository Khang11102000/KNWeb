'use client'

import { addNewUserAction } from '@/actions/users'
import Button from '@/components/button'
import Input from '@/components/input'
import { message, regex, regexMessage } from '@/constants/validate'
import { RegisterBodyType } from '@/types/auth'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const AddUserForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<RegisterBodyType>()

  const router = useRouter()

  // Event handling
  const onSubmit = async (data: RegisterBodyType) => {
    const payload = { ...data }

    try {
      // Call add new user server action
      const res = await addNewUserAction(payload)
      toast.success(res?.message || 'Add new user is successfully.')
      router.push('/admin/users')
    } catch (error: any) {
      toast.error(
        error?.data?.message || 'Add new user failed. Please try again.'
      )
    }
  }

  return (
    <form className='mt-6' onSubmit={handleSubmit(onSubmit)}>
      <Input
        label='Email'
        id='email'
        {...register('email', {
          required: message.EMAIL,
          pattern: {
            value: regex.EMAIL,
            message: regexMessage.EMAIL
          }
        })}
        error={errors?.email?.message || ''}
      />

      <Input
        label='Username'
        id='username'
        containerStyle='mt-3'
        {...register('username', {
          required: message.USERNAME,
          minLength: {
            value: 6,
            message: message.MIN_LENGTH_USERNAME
          }
        })}
        error={errors?.username?.message || ''}
      />

      <Input
        label='Password'
        id='password'
        type='password'
        containerStyle='mt-3'
        {...register('password', {
          required: message.PASSWORD,
          minLength: {
            value: 6,
            message: message.MIN_LENGTH_PASSWORD
          }
        })}
        error={errors?.password?.message || ''}
      />

      <Button
        className='mt-3 w-full'
        // type='submit'
        // onClick={(e) => e.preventDefault()}
      >
        Save
      </Button>
    </form>
  )
}

export default AddUserForm
