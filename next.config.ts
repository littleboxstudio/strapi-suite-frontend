import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: `${process.env.API_BASE_URL}/uploads/:path*`,
      },
    ];
  },
  images: {
    qualities: [100],
    // Next.js 16 blocks optimizing images served from local/private IPs by
    // default. The Strapi backend serves uploads from localhost, so allow it.
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      }
    ],
  },
};
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);