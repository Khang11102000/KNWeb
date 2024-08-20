import ButtonConfirm from '@/app/admin/users/delete/[id]/button-confirm'
import Button from '@/components/button'

type Props = {
  params: {
    id: string
  }
}

const DeleteUserPage = ({ params }: Props) => {
  const { id } = params || {}
  return (
    <div>
      <span>Are you sure delete userId = {id}?</span>
      <div className='flex items-center gap-4'>
        <Button variant='secondary'>Cancel</Button>
        <ButtonConfirm id={Number(id)} />
      </div>
    </div>
  )
}

export default DeleteUserPage
