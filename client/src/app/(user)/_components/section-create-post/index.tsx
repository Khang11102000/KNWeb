'use client'
import envConfig from '@/config/environment'
import { Button, Form, Input, Space } from 'antd'
import clsx from 'clsx'
import { Camera, Ellipsis, MapPin, UserRoundPlus } from 'lucide-react'
import { ChangeEvent, useEffect, useState } from 'react'
import styles from './section-create-post.module.scss'

const {
  sectionCreatePost,
  header,
  title,
  optionIconWrapper,
  content,
  footer,
  attachmentWrapper,
  attechmentItem,
  createPostContainer,
  customFormItem
} = styles

type FieldType = {
  content: string
  images?: string[]
}

const SectionCreatePost = () => {
  const [form] = Form.useForm()
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [rawImages, setRawImages] = useState<any[]>([])

  const handleCreatePost = (values: FieldType) => {
    if (values.images && previewImages.length > 0) {
      console.log('🚀values---->', { ...values, images: [...previewImages] })
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

        console.log('data', data)
        if (data?.public_id) {
          setPreviewImages((prev) => [...prev, data.secure_url])
        }
      } catch (error) {
        console.log('🚀error---->', error)
      }
    }
  }

  const handleImagesChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setRawImages((prev) => [...prev, ...Array.from(e.target.files as any)])
  }

  useEffect(() => {
    if (rawImages.length > 0) {
      handleUploadImages()
    }
  }, [rawImages])

  return (
    <>
      <section className={clsx(sectionCreatePost)}>
        {/* Create Post */}
        <div className={clsx(createPostContainer)}>
          {/* Header */}
          <div className={clsx(header)}>
            <h2 className={clsx('heading', title)}>Add a post</h2>
            <div className={clsx(optionIconWrapper)}>
              <Ellipsis />
            </div>
          </div>

          {/* Content */}
          {/* <div className={clsx(content)}>What are you thinking ?</div> */}
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
            </div>

            {/* Footer */}
            <div className={clsx(footer)}>
              {/* Attachment */}
              <div className={clsx(attachmentWrapper)}>
                <Form.Item
                  name='images'
                  label={<Camera size={18} />}
                  className={clsx(customFormItem, attechmentItem)}
                >
                  {/* <div className={clsx(attechmentItem)}> */}
                  {/* <label htmlFor='images'>
                    <Camera size={18} />
                  </label> */}
                  <Input
                    // id='images'
                    type='file'
                    multiple
                    style={{ display: 'none' }}
                    onChange={handleImagesChange}
                    value={''}
                  />
                  {/* </div> */}
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
                <Button type='text'>Discard</Button>
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
      </section>
    </>
  )
}

export default SectionCreatePost
