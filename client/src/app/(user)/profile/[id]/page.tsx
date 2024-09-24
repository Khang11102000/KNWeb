import { getServerSession } from 'next-auth'
import SectionProfileHeader from './section-profile-header'
import ProfileTabs from '@/app/(user)/profile/[id]/profile-tabs'
import { authOptions } from '@/config/auth-options'
import postService from '@/services/user/post-service'
import { IPost } from '@/types/post-type'

const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions)
  const accessToken = session?.token as string
  const userId = params.id

  const res = (await postService.getPostsByUser(accessToken, userId)) || []
  const posts = res as IPost[]

  return (
    <>
      <SectionProfileHeader />
      <section>
        <ProfileTabs posts={posts} />
      </section>
    </>
  )
}

export default ProfilePage
