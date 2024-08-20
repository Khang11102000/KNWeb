import Link from 'next/link'
import { FaRegEdit } from 'react-icons/fa'
import { AiOutlineDelete } from 'react-icons/ai'
import { formatDate } from '@/utils/format'

type Props = {
  users: any
}

const UserTable = ({ users }: Props) => {
  return (
    <>
      <table className='w-full mt-6'>
        <thead className='text-left bg-primary text-white'>
          <tr>
            <th className='px-3 py-2'>#</th>
            <th className='px-3 py-2'>Email</th>
            <th className='px-3 py-2'>Username</th>
            <th className='px-3 py-2'>Role</th>
            <th className='px-3 py-2'>Created At</th>
            <th className='px-3 py-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.length > 0 &&
            users.map((user: any) => (
              <tr key={user.id}>
                <td className='px-3'>{user.id}</td>
                <td className='px-3'>{user.email}</td>
                <td className='px-3'>{user.username}</td>
                <td className='px-3'>{user.group?.name}</td>
                <td className='px-3'>{formatDate(user.createdAt)}</td>
                <td className='px-3 flex items-center gap-2'>
                  {/* Edit */}
                  <Link href={`/admin/users/edit/${user.id}`}>
                    <span>
                      <FaRegEdit className='text-sunshine-yellow' size={20} />
                    </span>
                  </Link>

                  {/* Delete */}
                  <Link href={`/admin/users/delete/${user.id}`}>
                    <span>
                      <AiOutlineDelete className='text-sweet-red' size={20} />
                    </span>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}

export default UserTable
