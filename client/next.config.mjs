/** @type {import('next').NextConfig} */
import { hostname } from 'os'
import path from 'path'
const __dirname = path.resolve()
const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co'
      }
    ]
  }
}

export default nextConfig
