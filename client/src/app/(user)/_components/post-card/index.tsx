'use client'
import { IPost } from '@/types/post-type'
import { calculateHoursPassed } from '@/utils/helpers'
import { Avatar, Card, Dropdown, Flex, MenuProps, message, Modal } from 'antd'
import clsx from 'clsx'
import { Ellipsis, MessageCircle, Pencil, ThumbsUp, Trash } from 'lucide-react'
import Image from 'next/image'
import styles from './post-card.module.scss'
import { deletePostAction, editPostAction } from '@/actions/user/post-action'
import { useParams, useRouter } from 'next/navigation'
import { MouseEvent, useEffect, useState } from 'react'
import EditPost from '@/app/(user)/_components/post-card/edit-post'
import useAuthenticated from '@/hooks/useAuthenticated'
import authService from '@/services/auth-service'
import { useSession } from 'next-auth/react'
import { LikeIcon, MessageIcon } from '@/components/shared/icons'
import Comment from '@/app/(user)/_components/comment'
import commentService from '@/services/user/comment-service'
import { IComment } from '@/types/comment-type'
import { addCommentAction } from '@/actions/user/comment-action'

interface IPostCardProps {
  post: IPost
}

const {
  postCard,
  userName,
  timeAgo,
  contentWrapper,
  postImageWrapper,
  postImage,
  interactWrapper,
  interactItem,
  text,
  icon
} = styles

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
  const [isEditPostOpen, setIsEditPostOpen] = useState<boolean>(false)
  const [isToggleComment, setIsToggleComment] = useState<boolean>(false)
  const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false)
  const [comments, setComments] = useState<IComment[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { poster, content, createdAt, photo: postPhoto, id } = post || {}
  const { firstName, lastName, photo } = poster || {}
  const { data, status } = useSession()
  const router = useRouter()

  // EVENTS HANDLER
  // HANDLE SHOW EDIT POST MODAL
  const _onEditPostModalShow = () => {
    setIsEditPostOpen((prev) => !prev)
  }

  // HANDLE CLOSE EDIT POST MODAL
  const _onEditPostModalClose = () => {
    setIsEditPostOpen(false)
  }

  // HANDLE SHOW COMFIRM POPUP DELETE
  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure delete this post?',
      centered: true,
      content: 'Some descriptions',
      okText: 'Confirm',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          const res = await deletePostAction(id)
          message.success(res)
        } catch (error: any) {
          message.error(error)
        }
      },
      onCancel() {}
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

  // HANDLE TOGGLE COMMENTS
  const _onToggleComment = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setIsToggleComment((prev) => !prev)
  }

  // HANDLE ADD COMMENTS
  const handleAddComment = async (
    values: any,
    onSuccess?: () => void,
    onFailed?: () => void
  ) => {
    const payload = { ...values, postId: id }
    setIsLoading(true)
    try {
      const res = await addCommentAction(payload)
      if (res?.id) {
        message.success('You have added comment for this post is successfully')
        onSuccess?.()
        setComments((prevComments) => [...prevComments, res])
      }
    } catch (error) {
      message.error('Add comment for this post failed. Please, try gain!')
      onFailed?.()
    } finally {
      setIsLoading(false)
    }
  }

  // HANDLE NAME CLICK
  const handleNavigateToProfile = (
    e: MouseEvent<HTMLParagraphElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation()
    router.push(`/profile/${poster.id}`)
  }

  useEffect(() => {
    if (status === 'authenticated') {
      const fetchComments = async () => {
        const res = (await commentService.getCommentsByPostOrComment(
          data.token,
          id
        )) as IComment[]
        if (res.length > 0) {
          setComments([...res])
        }
      }
      fetchComments()
    }
  }, [status, data?.token, id])

  useEffect(() => {
    if (status === 'authenticated') {
      if (data.user.id === poster.id) {
        setIsShowDropdown(true)
      }
    }
  }, [status, data?.user.id, poster.id])

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
              <p
                className={clsx(userName)}
                onClick={handleNavigateToProfile}
              >{`${firstName} ${lastName}`}</p>
              <div className={clsx(timeAgo)}>
                {`${calculateHoursPassed(
                  createdAt?.toString() as string
                )} hours ago`}
              </div>
            </Flex>
          </Flex>
        }
        extra={
          isShowDropdown ? (
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
          ) : null
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
                priority
              />
            </div>
          )}
        </div>

        {/* INTERACTIVE */}
        <div className={clsx(interactWrapper)}>
          {/* LIKES */}
          <div className={clsx(interactItem)}>
            <LikeIcon classNames={clsx(icon)} />
            <span className={clsx(text)}>20 Likes</span>
          </div>

          {/* COMMENTS */}
          <div className={clsx(interactItem)} onClick={_onToggleComment}>
            <MessageIcon classNames={clsx(icon)} />
            <span className={clsx(text)}>{comments.length} Comments</span>
          </div>
        </div>

        {/* BOX COMMENT UI */}
        {isToggleComment && (
          <Comment
            isLoading={isLoading}
            postId={id}
            comments={comments}
            onAddComment={handleAddComment}
          />
        )}
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
