'use client'
import envConfig from '@/config/environment'
import {
  Avatar,
  Button,
  Col,
  Form,
  Input,
  Row,
  Space,
  Spin,
  Upload
} from 'antd'
import clsx from 'clsx'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import styles from './profile-tab.module.scss'

const { tabContent, title, informationForm } = styles

const InformationForm = () => {
  const [upLoading, setUpLoading] = useState<boolean>(false)
  const [previewImage, setPreviewImage] = useState<string>('')
  const [form] = Form.useForm()

  /*---------------- Events Handling -----------------*/
  // Handle Submit
  const handleSubmit = async (values: any) => {
    console.log('🚀values---->', values)
  }

  // Handle Upload Image
  const handleUploadImage = async (options: any) => {
    const imageFile = new FormData()
    imageFile.append('file', options?.file)
    imageFile.append('upload_preset', envConfig.NEXT_PUBLIC_UPLOAD_ASSETS_NAME)

    setUpLoading(true)
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${envConfig.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: imageFile
        }
      )

      const data = await res.json()

      setPreviewImage(data?.secure_url && data.secure_url)
      form.setFieldsValue({
        photo: data.secure_url
      })
      options.onSuccess()
    } catch (error) {
      console.log('🚀error---->', error)
      options.onError('Error uploading avatar')
    } finally {
      setUpLoading(false)
    }
  }

  return (
    <div className={clsx(tabContent)}>
      <h4 className={clsx(title)}>Personal Information</h4>
      <Spin spinning={false}>
        <Form
          form={form}
          layout='vertical'
          onFinish={handleSubmit}
          autoComplete='off'
          className={clsx(informationForm)}
        >
          <Row>
            <Col>
              <Form.Item label='Avatar' name='photo'>
                <div>
                  <Spin spinning={upLoading}>
                    <Avatar
                      size={150}
                      src={
                        previewImage ||
                        'https://media.istockphoto.com/id/619400810/photo/mr-who.webp?a=1&b=1&s=612x612&w=0&k=20&c=6cz9uumveIOesURahritB_WaN5aIkKy1lAOp_1VfBX8='
                      }
                    />
                  </Spin>

                  <Upload
                    style={{ position: 'relative' }}
                    showUploadList={false}
                    // beforeUpload={handleBeforeUpload}
                    customRequest={handleUploadImage}
                  >
                    <Button
                      icon={<Pencil />}
                      type='primary'
                      style={{
                        borderRadius: '50%',
                        position: 'absolute',
                        left: '95%',
                        top: '50%',
                        transform: 'translate(-50%, 50%)'
                      }}
                      // onClick={handleUploadImage}
                    ></Button>
                  </Upload>
                </div>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={14}>
            {/* First Name */}
            <Col span={12}>
              <Form.Item label='First Name' name='firstName'>
                <Input placeholder='Nam' size='large' />
              </Form.Item>
            </Col>

            {/* Last Name */}
            <Col span={12}>
              <Form.Item label='Last Name' name='lastName'>
                <Input placeholder='Nguyễn Kim Quốc' size='large' />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={14}>
            {/* Email */}
            <Col span={12}>
              <Form.Item label='Email' name='email'>
                <Input
                  placeholder='nguyenkimquocnam@gmail.com'
                  size='large'
                  disabled
                />
              </Form.Item>
            </Col>

            {/* Password */}
            <Col span={12}>
              <Form.Item label='Password' name='password'>
                <Input type='password' size='large' disabled />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item label='Introduce' name='introduce'>
                <Input.TextArea rows={4} style={{ resize: 'unset' }} />
              </Form.Item>
            </Col>
          </Row>

          <Space>
            <Button
              htmlType='submit'
              type='primary'
              style={{ fontSize: '1.2rem', borderRadius: 4 }}
            >
              Save
            </Button>
            <Button
              htmlType='button'
              style={{ fontSize: '1.2rem', borderRadius: 4 }}
              danger
            >
              Cancel
            </Button>
          </Space>
        </Form>
      </Spin>
    </div>
  )
}

export default InformationForm
