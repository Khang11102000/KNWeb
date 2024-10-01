import { getServerSession } from 'next-auth'
import SectionProfileHeader from './section-profile-header'
import ProfileTabs from '@/app/(user)/profile/[id]/profile-tabs'
import { authOptions } from '@/config/auth-options'
import postService from '@/services/user/post-service'
import { IPost } from '@/types/post-type'
import commentService from '@/services/user/comment-service'
import userService from '@/services/user/user-service'
import { IUser } from '@/types/user-type'

const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions)
  const accessToken = session?.token as string
  const userId = params.id

  const res = (await postService.getPostsByUser(accessToken, userId)) || []
  const posts = res as IPost[]
  const userRes = (await userService.getUserById(accessToken, userId)) as IUser

  return (
    <>
      <SectionProfileHeader user={userRes} />
      <section>
        <ProfileTabs posts={posts} />
      </section>
    </>
  )
}

export default ProfilePage
