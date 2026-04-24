/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  async rewrites() {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8081';
    console.log('Next.js Runtime - BACKEND_URL:', backendUrl);
    return [
      {
        source: '/api/payments/:path*',
        destination: `${backendUrl}/api/payments/:path*`,
      },
    ];
  },
};

export default nextConfig;

