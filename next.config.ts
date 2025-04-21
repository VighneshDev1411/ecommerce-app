/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["via.placeholder.com"], // 👈 Add your image host(s) here
  },
  // Add this webpack configuration
  webpack: (config:any) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname),
    };
    return config;
  },
  
};

module.exports = nextConfig;