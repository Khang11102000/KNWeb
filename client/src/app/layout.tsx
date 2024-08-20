import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import './globals.scss'
import 'react-toastify/dist/ReactToastify.css'
import AppProvider from '@/context/app-provider'
import { cookies } from 'next/headers'
import AuthProvider from '@/context/auth-provider'
import RefreshToken from '@/components/refresh-token'

const roboto = Roboto({
  subsets: ['vietnamese', 'latin'],
  weight: ['400', '500', '700', '900'],
  display: 'fallback'
})

export const metadata: Metadata = {
  title: 'Movie Ticket Booking',
  description: 'Movie Ticket Booking built by Quốc Nam'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value

  return (
    <html lang='en'>
      <body className={roboto.className} suppressHydrationWarning>
        <ToastContainer position='bottom-right' theme='colored' />
        <AppProvider initialToken={token}>
          <AuthProvider>{children}</AuthProvider>
        </AppProvider>
        <RefreshToken />
      </body>
    </html>
  )
}
