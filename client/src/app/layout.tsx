import NextAuthProvider from '@/context/nextauth-provider'
import '@/styles/globals.scss'
import theme from '@/utils/theme'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { App, ConfigProvider } from 'antd'
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['vietnamese', 'latin'],
  weight: ['400', '500', '700', '800'],
  display: 'fallback'
})

export const metadata: Metadata = {
  title: 'KNWeb',
  description: 'KNWeb Client built by QuocNam'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={plusJakartaSans.className} suppressHydrationWarning>
        <NextAuthProvider>
          <AntdRegistry>
            <ConfigProvider theme={theme}>{children}</ConfigProvider>
          </AntdRegistry>
        </NextAuthProvider>
      </body>
    </html>
  )
}
