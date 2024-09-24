import { IPost } from '@/types/post-type'
import { Button, Form, Input, Modal } from 'antd'

interface IEditPostProps {
  isOpen: boolean
  _onModalClose: () => void
  post: IPost
}

const EditPost = ({ isOpen, post, _onModalClose }: IEditPostProps) => {
  const [form] = Form.useForm()
  const { content } = post || {}

  return (
    <Modal
      title='Edit Post'
      open={isOpen}
      onOk={() => alert('ok')}
      onCancel={() => alert('cancel')}
      centered
      footer={
        <>
          <Button onClick={_onModalClose}>Cancel</Button>
          <Button type='primary'>Save</Button>
        </>
      }
    >
      <Form form={form} name='edit-post-form'>
        <Form.Item name='content' initialValue={content}>
          <Input.TextArea style={{ resize: 'none' }} />
        </Form.Item>
        {/* <Form.Item>
          <Image />
        </Form.Item> */}
      </Form>
    </Modal>
  )
}

export default EditPost
