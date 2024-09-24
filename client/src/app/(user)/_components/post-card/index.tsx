'use client'
import { IPost } from '@/types/post-type'
import { calculateHoursPassed } from '@/utils/helpers'
import { Avatar, Card, Dropdown, Flex, MenuProps, Modal } from 'antd'
import clsx from 'clsx'
import { Ellipsis, Pencil, Trash } from 'lucide-react'
import Image from 'next/image'
import styles from './post-card.module.scss'
import { deletePostAction, editPostAction } from '@/actions/user/post-action'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import EditPost from '@/app/(user)/_components/post-card/edit-post'

interface IPostCardProps {
  post: IPost
}

const { postCard, timeAgo, contentWrapper, postImageWrapper, postImage } =
  styles

const items: MenuProps['items'] = [
  {
    label: (
      <Flex align='center' gap={8}>
        <Pencil size={16} />
        <span>Edit</span>
      </Flex>
    ),
    key: 'edit'
  },
  {
    type: 'divider'
  },
  {
    label: (
      <Flex align='center' gap={8}>
        <Trash size={16} />
        <span>Delete</span>
      </Flex>
    ),
    key: 'delete'
  }
]

const { confirm } = Modal

const PostCard = ({ post }: IPostCardProps) => {
  const params = useParams<{ id: string }>()
  const [isEditPostOpen, setIsEditPostOpen] = useState<boolean>(false)
  const { poster, content, createdAt, photo: postPhoto, id } = post || {}
  const { firstName, lastName, photo } = poster || {}

  // EVENTS HANDLER
  // HANDLE SHOW EDIT POST MODAL
  const _onEditPostModalShow = () => {
    setIsEditPostOpen((prev) => !prev)
  }

  // HANDLE CLOSE EDIT POST MODAL
  const _onEditPostModalClose = () => {
    setIsEditPostOpen(false)
  }

  const _onDeletePost = async (postId: string) => {
    await deletePostAction(postId)
  }

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure delete this post?',
      // icon: ,
      centered: true,
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        _onDeletePost(id)
      },
      onCancel() {
        console.log('Cancel')
      }
    })
  }

  //  HANDLE ONCLICK EACH MENU DROPDOWN ITEMS
  const _onDropdownMenuItemClick = async (info: any) => {
    switch (info?.key) {
      case 'edit':
        _onEditPostModalShow()
        break
      case 'delete':
        showDeleteConfirm()
        break
      default:
        break
    }
  }

  return (
    <>
      <Card
        className={clsx(postCard)}
        title={
          <Flex align='center' gap={14}>
            <Avatar
              size={40}
              src={
                photo ||
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              }
            />
            <Flex align='center' gap='10px'>
              <p>{`${firstName} ${lastName}`}</p>
              <div className={clsx(timeAgo)}>
                {`${calculateHoursPassed(
                  createdAt?.toString() as string
                )} hours ago`}
              </div>
            </Flex>
          </Flex>
        }
        extra={
          <Dropdown
            menu={{
              items,
              onClick: (info) => {
                _onDropdownMenuItemClick(info)
              }
            }}
            trigger={['click']}
          >
            <Ellipsis style={{ cursor: 'pointer' }} />
          </Dropdown>
        }
      >
        {/* CONTENT */}
        <div className={clsx(contentWrapper)}>
          {/* TEXT */}
          {content && <p>{content}</p>}

          {/* IMAGES */}
          {postPhoto && (
            <div className={clsx(postImageWrapper)}>
              <Image
                src={postPhoto}
                alt=''
                className={clsx(postImage)}
                width={534}
                height={262}
              />
            </div>
          )}
        </div>

        {/* COMMENTS */}
      </Card>

      <EditPost
        isOpen={isEditPostOpen}
        _onModalClose={_onEditPostModalClose}
        post={post}
      />
    </>
  )
}

export default PostCard
