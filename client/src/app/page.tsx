import Link from 'next/link'
import React from 'react'
import { PRIVATE_ROUTES } from '@/constants/routes'

const HomePage = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <h1>WELLCOME TO KN WEB</h1>
      <Link href={PRIVATE_ROUTES.ADMIN.DASHBOARD}>Go to admin dashboard</Link>
    </div>
  )
}

export default HomePage
