/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'd3t3ozftmdmh3i.cloudfront.net',
        pathname: '/production/**',
      },
      {
        protocol: 'https',
        hostname: 'd3t3ozftmdmh3i.cloudfront.net',
        pathname: '/staging/**',
      },
    ],
  },
};

module.exports = nextConfig;
