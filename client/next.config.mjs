/** @type {import('next').NextConfig} */
import path from 'path'
const __dirname = path.resolve()
const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  }
}

export default nextConfig
