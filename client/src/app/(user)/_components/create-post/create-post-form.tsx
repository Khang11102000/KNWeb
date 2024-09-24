'use client'
import { Avatar, Divider, Flex, Form, Input, Modal } from 'antd'
import { X } from 'lucide-react'
import { SyntheticEvent } from 'react'

interface ICreatePostFormProps {
  isOpen: boolean
  handleCloseModal: (e: SyntheticEvent<Element, Event>) => void
}

const CreatePostForm = ({
  isOpen = false,
  handleCloseModal
}: ICreatePostFormProps) => {
  return (
    <Modal
      title='Create Post'
      open={isOpen}
      onCancel={handleCloseModal}
      footer={null}
      centered
      closeIcon={<X color='#2f65b9' />}
    >
      <Form>
        <Flex align='center' gap={10}>
          <Avatar
            style={{ flexShrink: 0 }}
            size={52}
            src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          />
          <Input />
        </Flex>
        <Divider />
      </Form>
    </Modal>
  )
}

export default CreatePostForm
