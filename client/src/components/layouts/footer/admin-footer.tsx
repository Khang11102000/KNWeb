import { Layout } from 'antd'

const { Footer } = Layout

const AdminFooter = () => {
  return (
    <Footer style={{ textAlign: 'center' }}>
      KNWeb ©{new Date().getFullYear()} Created by Khang & Nam
    </Footer>
  )
}

export default AdminFooter
