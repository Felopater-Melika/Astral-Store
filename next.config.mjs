/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    domains: ["cdn.shopify.com"],
  },
  experimental: {
    appDir: true,
  },
}

export default nextConfig
