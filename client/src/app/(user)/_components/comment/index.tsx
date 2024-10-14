'use client'

import { LikeIcon, SendIcon } from '@/components/shared/icons'
import { IComment } from '@/types/comment-type'
import { calculateHoursPassed } from '@/utils/helpers'
import { Avatar, Form, Input, message } from 'antd'
import clsx from 'clsx'
import styles from './comment.module.scss'
import { MouseEvent, useCallback, useEffect, useState } from 'react'
import { addCommentAction } from '@/actions/user/comment-action'
import commentService from '@/services/user/comment-service'
import { useSession } from 'next-auth/react'
import { Eclipse, Ellipsis } from 'lucide-react'
import OptionDropdown from '@/app/(user)/_components/comment/option-dropdown'

const {
  commentBox,
  addCommentForm,
  commentInputWrapper,
  inputWrapper,
  sendIcon,
  listComment,
  commentItem,
  commentWrapper,
  content,
  userComment,
  name,
  time,
  contentComment,
  actions,
  reply,
  replyBox,
  replyList,
  contentWrapper,
  options,
  active
} = styles

interface ICommentProps {
  postId?: string
  comments?: IComment[]
  isLoading?: boolean
  classNames?: string
  onAddComment: (
    data: any,
    onSuccess?: () => void,
    onFailed?: () => void
  ) => void
}

const Comment = ({
  comments = [],
  isLoading,
  classNames = '',
  onAddComment
}: ICommentProps) => {
  const [form] = Form.useForm()

  const handleAddComment = async (values: any) => {
    const data = { ...values }
    onAddComment?.(data, () => {
      form.resetFields()
    })
  }
  return (
    <div className={clsx(commentBox, classNames)}>
      {/* FORM ADD A COMMENT */}
      <Form
        form={form}
        onFinish={handleAddComment}
        className={clsx(addCommentForm)}
        disabled={isLoading}
      >
        <div className={clsx(commentInputWrapper)}>
          <Avatar size={34} style={{ flexShrink: 0 }} />
          <Form.Item name='content' style={{ width: '100%', marginBottom: 0 }}>
            <div className={clsx(inputWrapper)}>
              <Input placeholder='Add a comment...' />
              <span onClick={() => form.submit()} className={clsx(sendIcon)}>
                <SendIcon width={16} height={16} />
              </span>
            </div>
          </Form.Item>
        </div>
      </Form>

      {/* LIST COMMENTS */}
      {comments.length > 0 && (
        <div className={clsx(listComment)}>
          {comments.map((comment, index) => {
            return (
              <div key={comment.id || index}>
                <CommentItem comment={comment} />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

interface ICommentItemProps {
  comment: IComment
}

const CommentItem = ({ comment }: ICommentItemProps) => {
  const { commenter, id } = comment || {}
  const [isShowReply, setIsShowReply] = useState<boolean>(false)
  const [isAddReply, setIsAddReply] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isOptionActive, setIsOptionActive] = useState<boolean>(false)
  const [replyComments, setReplyComments] = useState<IComment[] | []>([])
  const { data, status } = useSession()

  // TOGGLE VIEW REPLIES
  const _onReplyClick = (e: MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation()
    setIsShowReply((prev) => !prev)
  }

  // TOGGLE ADD REPLY
  const handleToggleAddReply = (e: MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation()
    setIsAddReply((prev) => !prev)
  }

  const handleShowReplies = () => {
    setIsShowReply(true)
  }

  // ACTIVE OPTIONS (EDIT/DELELTE)
  const handleOptionsActive = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation()
    setIsOptionActive(true)
  }

  const handleOptionsInactive = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation()
    setIsOptionActive(false)
  }

  // ADD REPLY
  const handleAddReply = async (
    values: any,
    onSuccess?: () => void,
    onFailed?: () => void
  ) => {
    const payload = { ...values, commentId: id }

    setIsLoading(true)
    try {
      const res = await addCommentAction(payload)
      if (res?.id) {
        message.success('You have replied for this comment is successfully')
        onSuccess?.()
        setReplyComments((prevReplyComments) => [res, ...prevReplyComments])
        handleShowReplies()
      }
    } catch (error) {
      message.error('Something went wrong!')
      onFailed?.()
    } finally {
      setIsLoading(false)
    }
  }

  // FETCH REPLY COMMENTS
  useEffect(() => {
    const fetchReplyComments = async () => {
      const res = (await commentService.getCommentsByPostOrComment(
        data?.token as string,
        id as string
      )) as IComment[]

      if (res.length > 0) {
        setReplyComments([...res])
      }
    }

    if (status === 'authenticated') {
      fetchReplyComments()
    }
  }, [status, id, data?.token])

  return (
    <>
      <div
        className={clsx(commentItem)}
        onMouseEnter={handleOptionsActive}
        onMouseLeave={handleOptionsInactive}
      >
        <Avatar size={34} style={{ flexShrink: 0 }} />
        <div className={clsx(commentWrapper)}>
          {/* COMMENT TOP */}
          <div className={clsx(contentWrapper)}>
            <div className={clsx(content)}>
              {/* BOX NAME & HOURS AGO */}
              <div className={clsx(userComment)}>
                <p
                  className={clsx(name)}
                >{`${commenter.firstName} ${commenter.lastName}`}</p>
                <p className={clsx(time)}>
                  {calculateHoursPassed(
                    comment.createdAt?.toString() as string
                  ) + ' hours ago'}
                </p>
              </div>

              {/* CONTENT */}
              <p className={clsx(contentComment)}>{comment.content}</p>
            </div>

            <div
              className={clsx(options, {
                [active]: isOptionActive
              })}
            >
              {/* <Ellipsis /> */}
              <OptionDropdown />
            </div>
          </div>

          {/* COMMENT BOTTOM */}
          <div className={clsx(actions)}>
            {/* <span>
            <LikeIcon />
          </span> */}

            {/* ADD REPLY */}
            <span className={clsx(reply)} onClick={handleToggleAddReply}>
              Reply
            </span>

            {/* VIEW REPLIES */}
            {replyComments.length > 0 && (
              <span className={clsx(reply)} onClick={_onReplyClick}>
                {`(${replyComments.length})`} View replies
              </span>
            )}
          </div>
        </div>
      </div>

      {isShowReply && replyComments.length > 0 && (
        <Comment
          onAddComment={handleAddReply}
          comments={replyComments}
          isLoading={isLoading}
          classNames={clsx(replyList)}
        />
      )}

      {isAddReply && (
        <Comment
          classNames={replyBox}
          onAddComment={handleAddReply}
          isLoading={isLoading}
        />
      )}
    </>
  )
}

export default Comment
