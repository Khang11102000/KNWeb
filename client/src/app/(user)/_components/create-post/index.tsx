'use client'
import envConfig from '@/config/environment'
import { Button, Form, Input, message, Space } from 'antd'
import clsx from 'clsx'
import { Camera, Ellipsis, MapPin, Trash, UserRoundPlus } from 'lucide-react'
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './create-post.module.scss'
import { useSession } from 'next-auth/react'
import { ICreatePostPayload } from '@/types/post-type'
import postService from '@/services/user/post-service'
import { createPostAction } from '@/actions/user/post-action'

const {
  createPost,
  header,
  title,
  optionIconWrapper,
  content,
  footer,
  attachmentWrapper,
  attechmentItem,
  createPostContainer,
  customFormItem,
  previewListImages,
  previewItem,
  removeBtn
} = styles

type FieldType = {
  content: string
  photo?: string | null
}

interface ICreatePostProps {
  classNames?: string
  containerClassNames?: string
}

const CreatePost = ({ classNames, containerClassNames }: ICreatePostProps) => {
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [previewImages, setPreviewImages] = useState<
    { id: string; url: string }[]
  >([])
  const [rawImages, setRawImages] = useState<any[]>([])
  const { data: session, status } = useSession()

  const handleCreatePost = async (values: FieldType) => {
    if (status === 'authenticated') {
      const { id, email, firstName, lastName, photo } = session.user
      if (values.photo && previewImages.length > 0) {
        const payload: ICreatePostPayload = {
          poster: {
            id,
            email,
            firstName,
            lastName,
            photo
          },
          ...values,
          photo: previewImages[0].url
        }

        setIsLoading(true)
        try {
          const res = await createPostAction(payload)
          console.log('🚀res---->', res)
          if (res?.id) {
            message.success('Created post is successfully')
            form.resetFields()
            setPreviewImages([])
            setRawImages([])
          }
        } catch (error) {
          console.log('🚀error---->', error)
        } finally {
          setIsLoading(false)
        }
      }
    }
  }

  const handleUploadImages = async () => {
    const formData = new FormData()

    for (let file of rawImages) {
      formData.append('file', file)
      formData.append('upload_preset', envConfig.NEXT_PUBLIC_UPLOAD_ASSETS_NAME)

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${envConfig.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData
          }
        )

        const data = await res.json()

        if (data?.public_id) {
          setPreviewImages((prev) => [
            ...prev,
            { id: data.public_id, url: data.secure_url }
          ])
        }
      } catch (error) {
        console.log('🚀error---->', error)
      }
    }
  }

  const handleImagesChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setRawImages((prev) => [...prev, ...Array.from(e.target.files as any)])
  }

  const handleRemovePreviewImage = (e: MouseEvent<SVGElement>, id: string) => {
    e.stopPropagation()
    setPreviewImages((prev) => {
      return prev.filter((item) => item.id !== id)
    })
  }

  useEffect(() => {
    if (rawImages.length > 0) {
      handleUploadImages()
    }
  }, [rawImages])

  return (
    <>
      <div className={clsx(createPost, classNames)}>
        {/* Create Post */}
        <div className={clsx(createPostContainer, containerClassNames)}>
          {/* Header */}
          <div className={clsx(header)}>
            <h2 className={clsx('heading', title)}>Add a post</h2>
            <div className={clsx(optionIconWrapper)}>
              <Ellipsis />
            </div>
          </div>

          {/* Content */}
          <Form
            form={form}
            name='basic'
            autoComplete='off'
            onFinish={handleCreatePost}
          >
            <div className={clsx(content)}>
              <Form.Item name='content'>
                <Input.TextArea
                  placeholder='Write And Share Your Post With Your Friends...'
                  style={{
                    borderWidth: 0,
                    boxShadow: 'none',
                    resize: 'none',
                    padding: 0
                  }}
                />
              </Form.Item>

              {/* Preview List */}
              {previewImages.length > 0 && (
                <div className={clsx(previewListImages)}>
                  {previewImages.map((item) => {
                    const { id, url } = item || {}
                    return (
                      <div key={id} className={clsx(previewItem)}>
                        <Image
                          width={150}
                          height={150}
                          src={url}
                          alt=''
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />

                        {/* Close Button*/}
                        <Trash
                          className={clsx(removeBtn)}
                          onClick={(e) => handleRemovePreviewImage(e, id)}
                          color='#f14646'
                          style={{ backgroundColor: 'white', padding: 4 }}
                        />
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className={clsx(footer)}>
              {/* Attachment */}
              <div className={clsx(attachmentWrapper)}>
                <Form.Item
                  name='photo'
                  label={<Camera size={18} />}
                  className={clsx(customFormItem, attechmentItem)}
                >
                  <Input
                    type='file'
                    multiple
                    style={{ display: 'none' }}
                    onChange={handleImagesChange}
                    value={''}
                  />
                </Form.Item>
                <div className={clsx(attechmentItem)}>
                  <UserRoundPlus size={18} />
                </div>
                <div className={clsx(attechmentItem)}>
                  <MapPin size={18} />
                </div>
              </div>

              {/* Actions */}
              <Space align='center'>
                {/* <Button type='text'>Discard</Button> */}
                <Button
                  type='primary'
                  htmlType='submit'
                  style={{ paddingInline: '20px' }}
                >
                  Post
                </Button>
              </Space>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}

export default CreatePost
