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