'use client'
import React from 'react'
import {
  Avatar,
  Button,
  Divider,
  Flex,
  Layout,
  List,
  Typography,
  Input,
  Skeleton
} from 'antd'
import { SmileOutlined, SendOutlined } from '@ant-design/icons'
import { useContext } from 'react'

import './message.module.scss'
import { MessageContext } from '../context/messageContext'

export type RoomInfo = {
  id: string
  name: string
  avt: string
}
export type MessageParagraph = {
  id: string
  sender_id: string
  content: string
  createdAt: Date
}
export type MessageParagraphInfo = {
  room_id: string
  messageParagraph: MessageParagraph[]
}


const MessagePage: React.FC = () => {
  const data = useContext(MessageContext)

  const [messageText, setMessageText] = React.useState<string>('')
  const [isLoading, setLoading] = React.useState<boolean>(true)
  const [messageParagraph, setMessageParagraph] = React.useState<MessageParagraph[]>([])
  const [newMessage, setNewMessage] = React.useState<MessageParagraph>()

  console.log(0, messageParagraph)

  const scrollRef = React.useRef<null | HTMLElement>(null)

  React.useEffect(() => {
    console.log(1, messageParagraph)
    scrollRef?.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messageParagraph.length])

  React.useEffect(() => {

    data.socket.emit('get-message', {
      roomId: data.room.id
    })
    data.socket.on('message-data', (messages: any) => {
      if (messages && messages?.length > 0) {
        setLoading(false)
        setMessageParagraph([...messages])
      }

    })
    console.log(2, messageParagraph)

  }, [data.room.id])


  React.useEffect(() => {
    data.socket.on('new-chat', (chat: any) => {
      setNewMessage({
        id: chat.id,
        sender_id: chat.sender_id,
        content: chat.content,
        createdAt: chat.createAt
      })
    })

  }, [data.socket])
  
  React.useMemo(() => {
    if (newMessage)
      setMessageParagraph((old) => [...old, newMessage])
  }, [newMessage])

  const convertDate = (date: Date) => {
    let dd: number = 0,
      mm: number = 0,
      yyyy: number = 0
    if (typeof date?.getFullYear !== 'function') {
      date = new Date(date)
    }
    yyyy = date.getFullYear()
    mm = date.getMonth() + 1 // Months start at 0!
    dd = date.getDate()
    return (
      (dd < 10 ? '0' : '') + dd + '/' + (mm < 10 ? '0' : '') + mm + '/' + yyyy
    )
  }

  const handleChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value)
  }
  const sendMessage = () => {
    if (messageText.length > 0) {
      data.socket.emit('create', {
        room_id: data.room.id,
        content: messageText
      })
    }
    setMessageText('')
    // const target = e.target as HTMLTextAreaElement
  }

  console.log('child-render')

  return (
    <div style={{ width: '100%' }}>
      <Layout style={contentStyle}>
        <Flex style={messageContainerStyle} vertical justify='space-around'>
          <Flex
            justify='center'
            align='start'
            style={{ height: '75px', padding: '0px 15px' }}
          >
            <Flex
              justify='flex-start'
              align='center'
              style={{ height: '100%', width: '50%' }}
            >
              <Flex>
                <Avatar size={48} src={
                  data.room.avt
                } />
              </Flex>
              <Flex
                vertical
                justify='center'
                align='start'
                style={{ marginLeft: '5px' }}
              >
                <Typography.Title level={5}>{
                  data.room.name
                }</Typography.Title>
                <Typography.Paragraph style={{ margin: '0px' }}>
                  Online
                </Typography.Paragraph>
              </Flex>
            </Flex>
            <Flex
              justify='flex-end'
              align='center'
              style={{ height: '100%', width: '50%' }}
            >
              Not action
            </Flex>
          </Flex>
          <Divider style={{ margin: '2px' }} />
          {isLoading ? <Skeleton active style={{
            height: 'calc(100% - 75px)',
            width: '100%',
            padding: '15px'
          }} /> :
            <Flex
              style={{
                height: 'calc(100% - 75px)',
                width: '100%',
                padding: '15px'
              }}
            >
              <List
                size='large'
                style={{
                  width: '100%',
                  padding: '15px',
                  overflowY: 'scroll'
                }}
                bordered
                dataSource={messageParagraph}
                renderItem={(message) =>
                  message.sender_id &&
                  (message.sender_id === data.session?.user.id ? (
                    <Flex
                      ref={scrollRef}
                      vertical
                      align='end'
                      justify='center'
                      style={{}}
                    >
                      <Typography.Paragraph
                        style={{
                          margin: '0px',
                          padding: '5px',
                          backgroundColor: '#0076de',
                          color: '#FFF',
                          borderRadius: '10px'
                        }}
                      >
                        {message.content}
                      </Typography.Paragraph>
                      <Typography.Paragraph
                        style={{ margin: '0px', fontSize: '8px' }}
                      >
                        {convertDate(message?.createdAt)}
                      </Typography.Paragraph>
                    </Flex>
                  ) : (
                    <Flex ref={scrollRef}>
                      <Flex>
                        <Avatar size={48} />
                      </Flex>
                      <Flex
                        vertical
                        align='start'
                        justify='center'
                        style={{ paddingLeft: '10px' }}
                      >
                        <Typography.Paragraph
                          style={{
                            margin: '0px',
                            padding: '5px',
                            backgroundColor: '#b5b5b5',
                            borderRadius: '10px'
                          }}
                        >
                          {message.content}
                        </Typography.Paragraph>
                        <Typography.Paragraph
                          style={{ margin: '0px', fontSize: '8px' }}
                        >
                          {convertDate(message?.createdAt)}
                        </Typography.Paragraph>
                      </Flex>
                    </Flex>
                  ))
                }
              />
            </Flex>}
        </Flex>
        <Flex
          style={actionContainerStyle}
          justify='space-around'
          align='center'
        >
          <Input
            size='large'
            placeholder='Basic usage'
            style={{ width: 'calc(100% - 90px)' }}
            addonAfter={<SmileOutlined />}
            onChange={handleChangeMessage}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => { e.key == 'Enter' && sendMessage() }}

            value={messageText}
          />
          <Button
            type='primary'
            shape='circle'
            size='large'
            icon={<SendOutlined />}
            onClick={sendMessage}
          />
        </Flex>
      </Layout>
    </div>
  )
}

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  width: 'calc(100% - 250px)',
  height: '100%'
}
const messageContainerStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 'calc(100% - 80px)',
  height: 'calc(100% - 80px)',
  width: '100%'
}
const actionContainerStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: '80px',
  height: '80px',
  width: '100%',
  padding: '12px'
}

export default React.memo(MessagePage)
