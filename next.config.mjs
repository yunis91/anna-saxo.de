import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Frontend renders without remote images by default; add Neon-served media host when wired.
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // Placeholder photography until real assets are added.
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'fastly.picsum.photos' },
    ],
  },
}

export default withPayload(nextConfig)
