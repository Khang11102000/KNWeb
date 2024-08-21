import { Flex } from 'antd'
import { ReactNode } from 'react'

const AuthLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <Flex style={{ height: '100vh' }} align='center' justify='center'>
      {children}
    </Flex>
  )
}

export default AuthLayout
