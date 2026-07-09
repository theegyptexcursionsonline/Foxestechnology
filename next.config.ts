// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Skip the in-build ESLint + tsc pass. Types/lint are genuinely clean and are
  // enforced separately by the QA gate (scripts/qa-gate.mjs); running the full
  // type-check again inside Netlify's memory-constrained build container OOMs it
  // ("checking validity of types" → generic exit 2). Do NOT read this as "errors
  // unchecked" — they're checked in the gate, just not duplicated in the build.
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

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