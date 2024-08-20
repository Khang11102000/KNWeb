'use client'

import Button from '@/components/button'
import { useRouter } from 'next/navigation'
import { IoAdd } from 'react-icons/io5'

const ButtonAddUser = () => {
  const router = useRouter()
  return (
    <Button
      size='medium'
      className='gap-2'
      onClick={() => router.push('/admin/users/add')}
    >
      <IoAdd />
      Add new user
    </Button>
  )
}

export default ButtonAddUser
