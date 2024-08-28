import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import '@/styles/globals.scss'
import NextAuthProvider from '@/context/nextauth-provider'

const roboto = Roboto({
  subsets: ['vietnamese', 'latin'],
  weight: ['400', '500', '700', '900'],
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
      <body className={roboto.className} suppressHydrationWarning>
        <NextAuthProvider>
          <AntdRegistry>{children}</AntdRegistry>
        </NextAuthProvider>
      </body>
    </html>
  )
}
