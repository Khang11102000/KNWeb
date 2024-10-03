'use client'
import React from 'react';
import { Avatar, Button, Divider, Flex, Layout, List, Typography, Input } from 'antd';
import { SmileOutlined, SendOutlined } from '@ant-design/icons';
import { io, Socket } from 'socket.io-client';
import messageService from '@/services/user/message-service';
import userService from '@/services/user/user-service';
import { useSession } from 'next-auth/react';
import './message.module.scss'
import Header from '../(user)/_components/header';

const { Sider } = Layout;
const { Search } = Input;

export type ReceiverInfo = {
  id: string,
  name: string,
  avt: string
}
export type MessageParagraph = {
  id: string,
  sender_id: string,
  content: string,
  createdAt: Date,
}
export type MessageParagraphInfo = {
  room_id: string
  messageParagraph: MessageParagraph[],
}
const MessagePage: React.FC = () => {
  const { data: session, status } = useSession()
  const [userId, setUserId] = React.useState<string>('');
  const [token, setToken] = React.useState<string>('');
  const [receiver, setReceiver] = React.useState<ReceiverInfo>({
    id: '',
    name: '',
    avt: '',
  })
  const [messageText, setMessageText] = React.useState<string>('');

  const [messageParagraphInfo, setMessageParagraphInfo] = React.useState<MessageParagraphInfo>({
    room_id: "",
    messageParagraph: []
  });

  const [listFriends, setListFriends] = React.useState<any[]>([]);
  const scrollRef = React.useRef<null | HTMLElement>(null);

  let socket = io('http://localhost:800/chats', {
    auth: {
      userId: session?.user.id
    },
    extraHeaders: {
      Authorization: `Bearer ${session?.token}`
    },

  });

  React.useEffect(() => {
    if (status === 'authenticated' && session.user.id) {
      setUserId(session.user.id)
      setToken(session.token)
    }
    else {
      socket.on('disconnect', function () {
      });
    }
  }, [])

  React.useMemo(() => {
    if (userId.length > 1) {
      userService.getAllFriend(userId, token, {}).then((res: any) => {
        if (res?.data?.length > 0) {
          setListFriends([...res.data])
          setReceiver({
            ...receiver,
            id: res.data[0].id,
            name: res.data[0].firstName + ' ' + res.data[0].lastName,
            avt: res.data[0].avt
          })

        }
      })
    }
  }, [userId])

  React.useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageParagraphInfo.messageParagraph]);

  React.useMemo(() => {
    if (!messageParagraphInfo.room_id) {
      socket.on('new-room', (room => {
        setMessageParagraphInfo({
          ...messageParagraphInfo,
          room_id: room
        })
      }))
    }
  }, [socket])
  React.useMemo(() => {
    socket.on('new-chat', (chat => {
      setMessageParagraphInfo({
        ...messageParagraphInfo,
        messageParagraph: [...messageParagraphInfo.messageParagraph, chat]
      })
    }))

  }, [socket])

  const convertDate = (date: Date) => {
    let dd: number = 0,
      mm: number = 0,
      yyyy: number = 0
    if (typeof date?.getFullYear !== 'function') {
      date = new Date(date)
    }
    yyyy = date.getFullYear();
    mm = date.getMonth() + 1; // Months start at 0!
    dd = date.getDate();
    return (dd < 10 ? '0' : '') + dd + '/' + (mm < 10 ? '0' : '') + mm + '/' + yyyy;

  }
  const handleClickUserListItem = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, receiverTarget: ReceiverInfo) => {
    // const target = e.target as HTMLTextAreaElement
    setReceiver({ ...receiverTarget });
    e.preventDefault()
    messageService.getPersonalRoom(token, receiverTarget.id).then(room => {
      if (room) {
        socket.on('connection', sk => {
          sk.join((room as any).id);
        });
        messageService.getAllChat(token, (room as any).id).then((res: any) => {
          if (res) {
            setMessageParagraphInfo({
              ...messageParagraphInfo,
              messageParagraph: (res as MessageParagraph[]),
              room_id: (room as any).id
            })
          }
          else setMessageParagraphInfo({ ...messageParagraphInfo, messageParagraph: [] })
        })
      }
      else {
        setMessageParagraphInfo({ ...messageParagraphInfo, messageParagraph: [] })
      }
    })
  }
  const handleChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value);
  }
  const sendMessage = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (messageParagraphInfo.messageParagraph?.length > 0) {
      socket.emit('create', { room_id: messageParagraphInfo.room_id, content: messageText })
    }
    else {
      messageService.createRoom(token, {
        name: "",
        members: [userId, receiver.id],
        type: 'personal'
      }).then(res => {
        socket.on('connection', sk => {
          sk.join((res as any).id);
        });
        socket.emit('create', { room_id: (res as any).id, content: messageText })
        socket.emit('new-room', { room: (res as any).id, receiver: receiver.id })
      })
    }
    setMessageText("");
    // const target = e.target as HTMLTextAreaElement
  }

  return (
    <Flex gap="middle" wrap justify='center' align='center' style={{ height: '100vh' }}>
      <Header/>
      <Layout style={layoutStyle}>
        <Sider width={350} theme='light' style={siderStyle}>
          <Flex style={activeChatStyle}>
            <Typography.Title level={3}>Actives: 0</Typography.Title>
          </Flex>
          <Flex style={usersOnlineStyle} vertical>
            <Flex style={{ width: '100%', padding: '15px 10px' }}>
              <Search placeholder="Search for chat" onSearch={() => { }} />
            </Flex>
            <Flex style={{ width: '100%', padding: '15px 10px' }}>
              <List
                size="large"
                style={{ width: '100%' }}
                bordered
                dataSource={listFriends}
                renderItem={(user) =>
                  <List.Item id={user.id} style={{ padding: '16px 15px', cursor: 'pointer', backgroundColor: `${user.id === receiver.id ? '#9ea5b5' : '#FFF'}` }}
                    onClick={(e) => handleClickUserListItem(e,
                      {
                        id: user.id,
                        name: user.firstName + ' ' + user.lastName,
                        avt: user.avt
                      }
                    )}>
                    <Flex justify='center' align='center'>
                      <Flex justify='center' align='center'>
                        <Avatar size={48} />
                      </Flex>
                      <Flex vertical justify='center' align='start' style={{ marginLeft: '5px' }}>
                        <Typography.Title level={5}>{user.firstName} {user.lastName}</Typography.Title>
                        <Typography.Paragraph style={{ margin: '0px' }}>This is a copyable.</Typography.Paragraph>
                      </Flex>
                    </Flex>
                  </List.Item>
                }
              />
            </Flex>
          </Flex>
        </Sider>
        <Layout style={contentStyle}>
          <Flex style={messageContainerStyle} vertical justify='space-around'>
            <Flex justify='center' align='start' style={{ height: '75px', padding: "0px 15px" }}>
              <Flex justify='flex-start' align='center' style={{ height: '100%', width: '50%' }}>
                <Flex>
                  <Avatar size={48} src={receiver.avt} />
                </Flex>
                <Flex vertical justify='center' align='start' style={{ marginLeft: '5px' }}>
                  <Typography.Title level={5}>{receiver.name}</Typography.Title>
                  <Typography.Paragraph style={{ margin: '0px' }}>Online</Typography.Paragraph>
                </Flex>
              </Flex>
              <Flex justify='flex-end' align='center' style={{ height: '100%', width: '50%' }}>Not action</Flex>
            </Flex>
            <Divider style={{ margin: '2px' }} />
            <Flex style={{ height: 'calc(100% - 75px)', width: '100%', padding: '15px' }}>
              <List
                size="large"
                style={{
                  width: '100%', padding: '15px', overflowY: 'scroll'
                }}
                bordered
                dataSource={messageParagraphInfo.messageParagraph}
                renderItem={(message) =>
                  message.sender_id && (
                    message.sender_id === userId
                      ? <Flex ref={scrollRef} vertical align='end' justify='center' style={{}}>
                        <Typography.Paragraph style={{ margin: '0px', padding: '5px', backgroundColor: '#0076de', color: '#FFF', borderRadius: '10px' }}>{message.content}</Typography.Paragraph>
                        <Typography.Paragraph style={{ margin: '0px', fontSize: '8px' }}>{convertDate(message?.createdAt)}</Typography.Paragraph>
                      </Flex>
                      :
                      <Flex ref={scrollRef}>
                        <Flex>
                          <Avatar size={48} />
                        </Flex>
                        <Flex vertical align='start' justify='center' style={{ paddingLeft: '10px' }}>
                          <Typography.Paragraph style={{ margin: '0px', padding: '5px', backgroundColor: '#b5b5b5', borderRadius: '10px' }}>{message.content}</Typography.Paragraph>
                          <Typography.Paragraph style={{ margin: '0px', fontSize: '8px' }}>{convertDate(message?.createdAt)}</Typography.Paragraph>
                        </Flex>
                      </Flex>
                  )

                }
              />
            </Flex>
          </Flex>
          <Flex style={actionContainerStyle} justify='space-around' align='center'>
            <Input size="large" placeholder="Basic usage" style={{ width: 'calc(100% - 90px)' }} addonAfter={<SmileOutlined />} onChange={handleChangeMessage}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                  return sendMessage

                }}} />
            <Button type="primary" shape="circle" size='large' icon={<SendOutlined />} onClick={sendMessage} />
          </Flex>
        </Layout>
      </Layout>
    </Flex>
  )
}
const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  width: 'calc(60% - 8px)',
  maxWidth: 'calc(60% - 8px)',
  height: '70%',
  minHeight: '700px',
};

const siderStyle: React.CSSProperties = {
  textAlign: 'start',
  lineHeight: '90px',
  color: '#fff',
};
const activeChatStyle: React.CSSProperties = {
  justifyContent: 'center',
  alignItems: 'center',
  color: '#fff',
  width: 'inherit',
  height: '90px',
  minHeight: '90px',
  borderBottom: '1px solid #d9dbd9'
};
const usersOnlineStyle: React.CSSProperties = {
  textAlign: 'start',
  lineHeight: '120px',
  color: '#fff',
  width: 'inherit',
};
const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  width: 'calc(100% - 250px)',
  height: '100%'
};
const messageContainerStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 'calc(100% - 80px)',
  height: 'calc(100% - 80px)',
  width: '100%',
};
const actionContainerStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: '80px',
  height: '80px',
  width: '100%',
  padding: '12px'
};

export default MessagePage
