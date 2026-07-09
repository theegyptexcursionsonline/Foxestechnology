// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

 images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'upload.wikimedia.org',
      pathname: '/wikipedia/en/thumb/4/41/Flag_of_India.svg/**',
    },
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
    },
    {
      protocol: 'https',
      hostname: 'plus.unsplash.com',
    },
    {
      protocol: 'https',
      hostname: 'cdn.dribbble.com',
    },
    {
      protocol: 'https',
      hostname: 'via.placeholder.com',
    },
  ],
},
};

module.exports = nextConfig;