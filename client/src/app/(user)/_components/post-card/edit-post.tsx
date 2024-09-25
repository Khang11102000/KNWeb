import { editPostAction } from '@/actions/user/post-action'
import CreatePost from '@/app/(user)/_components/create-post'
import envConfig from '@/config/environment'
import { IPost } from '@/types/post-type'
import { Button, Flex, Form, Input, message, Modal, Space } from 'antd'
import Image from 'next/image'
import { ChangeEvent, useEffect, useState } from 'react'

interface IEditPostProps {
  isOpen: boolean
  _onModalClose: () => void
  post: IPost
}

const EditPost = ({ isOpen, post, _onModalClose }: IEditPostProps) => {
  const { content, photo, id } = post || {}
  const [form] = Form.useForm()
  const [file, setFile] = useState<any>()
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [photoPreview, setPhotoPreview] = useState<string>('')

  console.log('🚀photoPreview---->', photoPreview)

  // EVENTS HANDLER
  const _onSave = async (values: any) => {
    let payload = {}
    if (photoPreview) {
      payload = { ...values, photo: photoPreview }
    } else {
      payload = { ...values }
    }

    setIsLoading(true)
    try {
      const res = await editPostAction(id, payload)
      if (res?.id) {
        message.success('You have successfully updated the post')
      }
    } catch (error: any) {
      console.log('🚀error---->', error)
      message.error(error?.message)
    } finally {
      setIsLoading(false)
    }
  }

  const _onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0])
  }

  const handleUploadFile = async (file: any) => {
    if (!file) {
      return
    }

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', envConfig.NEXT_PUBLIC_UPLOAD_ASSETS_NAME)
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${envConfig.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      )

      const fileDataUploaded = await res.json()
      if (fileDataUploaded?.public_id) {
        message.success('Image file uploaded is successfully')
        setPhotoPreview(fileDataUploaded?.secure_url)
      }
    } catch (error) {
      console.log('🚀error---->', error)
      message.error('Image file upload failed. Please, try again')
    } finally {
      setIsUploading(false)
    }
  }

  // SIDE EFFECTS
  useEffect(() => {
    handleUploadFile(file)
  }, [file])

  useEffect(() => {
    if (photo) {
      setPhotoPreview(photo)
    }
  }, [photo])

  return (
    <Modal title='Edit Post' open={isOpen} centered footer={null}>
      <Form
        form={form}
        onFinish={_onSave}
        name='edit-post-form'
        disabled={isLoading}
      >
        <Form.Item name='content' initialValue={content}>
          <Input.TextArea style={{ resize: 'none' }} />
        </Form.Item>
        {photoPreview ? (
          <Space size='middle' direction='vertical' style={{ width: '100%' }}>
            <Image
              src={photoPreview}
              alt='photo'
              width={400}
              height={200}
              style={{ width: '100%', borderRadius: '4px' }}
            />
            <Input
              type='file'
              onChange={_onFileChange}
              disabled={isUploading}
            />
          </Space>
        ) : (
          <>
            <Input
              type='file'
              onChange={_onFileChange}
              disabled={isUploading}
            />
          </>
        )}
        <Flex align='center' gap={12} justify='end' style={{ marginTop: 24 }}>
          <Button onClick={_onModalClose}>Cancel</Button>
          <Button type='primary' htmlType='submit'>
            Save
          </Button>
        </Flex>
      </Form>
    </Modal>
  )
}

export default EditPost
