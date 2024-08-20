import { ReactNode } from 'react'

type AuthLayoutProps = {
  children: ReactNode
}

const AuthLayout = ({ children }: Readonly<AuthLayoutProps>) => {
  return <>{children}</>
}

export default AuthLayout
