const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // 특정 패턴을 지정하여 모든 HTTPS 도메인의 이미지를 허용하고 최적화함
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // 모든 HTTPS 도메인 허용
      },
      {
        protocol: 'http',
        hostname: '**' // 모든 HTTP 도메인 허용
      },
    ],
    deviceSizes: [
      360, 414, 512, 640, 750, 828, 1080, 1200, 1536, 1920, 2048, 3840,
    ],
  },
};

module.exports = withContentlayer(nextConfig);
