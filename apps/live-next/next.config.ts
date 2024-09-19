import withBundleAnalyzer from '@next/bundle-analyzer'
import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  images: {
    remotePatterns: [{hostname: 'cdn.sanity.io'}, {hostname: 'source.unsplash.com'}],
  },

  typescript: {
    // @TODO figure out why TSC fails in the Next.js process but works fine when running `tsc --noEmit`
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  experimental: {
    reactCompiler: true,
    ppr: true,
  },
} satisfies NextConfig

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig)
