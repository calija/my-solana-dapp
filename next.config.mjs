/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_RPC_URL: process.env.NEXT_RPC_URL,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;
