import accountService from '@/services/account-service'
import { cookies } from 'next/headers'

type Props = {
  params: {
    id: string
  }
}

const EditUserPage = async ({ params }: Props) => {
  const { id } = params
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value || ''
  const { accessToken } = JSON.parse(token)

  return <div>EditUserPage</div>
}

export default EditUserPage
