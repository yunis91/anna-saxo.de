import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // Uploaded media is served from Vercel Blob.
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
      // Placeholder photography until real assets are added.
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'fastly.picsum.photos' },
    ],
  },
}

export default withPayload(nextConfig)
