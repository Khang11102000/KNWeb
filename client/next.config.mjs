/** @type {import('next').NextConfig} */
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
        hostname: 'res.cloudinary.com',
        port: ''
        // pathname: '/account123/**'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: ''
        // pathname: '/account123/**'
      }
    ]
  }
}

export default nextConfig
