'use client'

import { deleteUserAction } from '@/actions/users'
import Button from '@/components/button'
import accountService from '@/services/account-service'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

type Props = {
  id: number
}

const ButtonConfirm = ({ id }: Props) => {
  const router = useRouter()

  // Handle delete user
  const handleDeleteUser = async () => {
    // const payload = { userId: id }
    try {
      // const res = await accountService.deleteUser(payload)
      const res = await deleteUserAction(id)

      // Notification
      toast.success(res?.message || 'Deleted user is successfully.')

      // Navigate to user list page
      router.push('/admin/users')
    } catch (error: any) {
      toast.error(
        error?.data?.message || 'Delete user failed. Please try again.'
      )
    }
  }

  return <Button onClick={handleDeleteUser}>Confirm</Button>
}

export default ButtonConfirm
