'use client'
import React from 'react';
import { Avatar, Button, Divider, Flex, Layout, List, Typography, Input } from 'antd';
import { SmileOutlined, SendOutlined } from '@ant-design/icons';

import './message.module.scss'

const { Sider } = Layout;
const { Search } = Input;

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


const MessagePage: React.FC = () => {
  const [userTargetPosition, setUserTargetPosition] = React.useState<number>(0);
  const convertDate = (date: Date) => {
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1; // Months start at 0!
    let dd = date.getDate();

    return (dd < 10 ? '0' : '') + dd + '/' + (mm < 10 ? '0' : '') + mm + '/' + yyyy;
  }
  const handleClickUserListItem = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, position: number) => {
    setUserTargetPosition(position);
  }
  return (
    <Flex gap="middle" wrap justify='center' align='center' style={{ height: '100vh' }}>
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
                dataSource={listUserData}
                renderItem={(user, position) =>
                  <List.Item style={{ padding: '16px 15px', cursor: 'pointer', backgroundColor: `${position === userTargetPosition ? '#9ea5b5' : '#FFF'}` }}
                    onClick={(e) => handleClickUserListItem(e, position)}>
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
                  <Avatar size={48} />
                </Flex>
                <Flex vertical justify='center' align='start' style={{ marginLeft: '5px' }}>
                  <Typography.Title level={5}>Nam Nguyễn</Typography.Title>
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
                dataSource={listMessage}
                renderItem={(message) =>
                  message.sender === '66ee50a97c63aa5e453b5b42'
                    ? <Flex vertical align='end' justify='center' style={{}}>
                      <Typography.Paragraph style={{ margin: '0px', padding: '5px', backgroundColor: '#0076de', color: '#FFF', borderRadius: '10px' }}>{message.content}</Typography.Paragraph>
                      <Typography.Paragraph style={{ margin: '0px' }}>{convertDate(message.createAt)}</Typography.Paragraph>
                    </Flex>
                    : <Flex>
                      <Flex>
                        <Avatar size={48} />
                      </Flex>
                      <Flex vertical align='start' justify='center' style={{ paddingLeft: '10px' }}>
                        <Typography.Paragraph style={{ margin: '0px', padding: '5px', backgroundColor: '#b5b5b5', borderRadius: '10px' }}>{message.content}</Typography.Paragraph>
                        <Typography.Paragraph style={{ margin: '0px' }}>{convertDate(message.createAt)}</Typography.Paragraph>
                      </Flex></Flex>
                }
              />
            </Flex>
          </Flex>
          <Flex style={actionContainerStyle} justify='space-around' align='center'>
            <Input size="large" placeholder="Basic usage" style={{ width: 'calc(100% - 90px)' }} addonAfter={<SmileOutlined />} />
            <Button type="primary" shape="circle" size='large' icon={<SendOutlined />} />
          </Flex>
        </Layout>
      </Layout>
    </Flex>
  )
}
const listUserData = [{
  id: '66ee50a97c63aa5e453b5b42',
  email: "nguyennam@gmail.com",
  firstName:
    "Nam",
  lastName:
    "Quốc",

  role: {
    id: 2
  },
  status: {
    id: 1
  }

}, {
  id: '66ee50a97c63aa5e453b5b43',
  email: "nguyenkimquocnam@gmail.com",
  firstName:
    "Nam",
  lastName:
    "Nguyễn",

  role: {
    id: 2
  },
  status: {
    id: 1
  }

}, {
  id: '66ee50a97c63aa5e453b5b44',
  email: "ngutran@gmail.com",
  firstName:
    "Ngu",
  lastName:
    "Trần",

  role: {
    id: 2
  },
  status: {
    id: 1
  }

}]
const listMessage = [{
  id: 1,
  sender: "66ee50a97c63aa5e453b5b42",
  receiver: "66ee50a97c63aa5e453b5b43",
  content: "Tối mai cafe",
  createAt: new Date(),

},
{
  id: 2,
  sender: "66ee50a97c63aa5e453b5b43",
  receiver: "66ee50a97c63aa5e453b5b42",
  content: "Quán nào?",
  createAt: new Date(),
},
{
  id: 3,
  sender: "66ee50a97c63aa5e453b5b42",
  receiver: "66ee50a97c63aa5e453b5b43",
  content: "My cafe",
  createAt: new Date(),
},
{
  id: 4,
  sender: "66ee50a97c63aa5e453b5b43",
  receiver: "66ee50a97c63aa5e453b5b42",
  content: "Ok 8h ra",
  createAt: new Date(),
},
{
  id: 5,
  sender: "66ee50a97c63aa5e453b5b42",
  receiver: "66ee50a97c63aa5e453b5b43",
  content: "OK",
  createAt: new Date(),
},
{
  id: 6,
  sender: "66ee50a97c63aa5e453b5b42",
  receiver: "66ee50a97c63aa5e453b5b43",
  content: "Tối mai cafe",
  createAt: new Date(),

},
{
  id: 7,
  sender: "66ee50a97c63aa5e453b5b43",
  receiver: "66ee50a97c63aa5e453b5b42",
  content: "Quán nào?",
  createAt: new Date(),
},
{
  id: 8,
  sender: "66ee50a97c63aa5e453b5b42",
  receiver: "66ee50a97c63aa5e453b5b43",
  content: "My cafe",
  createAt: new Date(),
},
{
  id: 9,
  sender: "66ee50a97c63aa5e453b5b43",
  receiver: "66ee50a97c63aa5e453b5b42",
  content: "Ok 8h ra",
  createAt: new Date(),
},
{
  id: 10,
  sender: "66ee50a97c63aa5e453b5b42",
  receiver: "66ee50a97c63aa5e453b5b43",
  content: "OK",
  createAt: new Date(),
},
{
  id: 11,
  sender: "66ee50a97c63aa5e453b5b43",
  receiver: "66ee50a97c63aa5e453b5b42",
  content: "Ok 8h ra",
  createAt: new Date(),
},
{
  id: 12,
  sender: "66ee50a97c63aa5e453b5b42",
  receiver: "66ee50a97c63aa5e453b5b43",
  content: "OK",
  createAt: new Date(),
}]
export default MessagePage
