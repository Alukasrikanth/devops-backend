/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/payments/:path*',
        destination: `${process.env.BACKEND_URL || 'http://localhost:8081'}/api/payments/:path*`,
      },
    ];
  },
};

export default nextConfig;

