/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Optional: Change the output directory to 'out' instead of '.next/out'
  // distDir: 'out'
}

module.exports = nextConfig

