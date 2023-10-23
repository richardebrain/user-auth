/** @type {import('next').NextConfig} */
const nextConfig = {
  output:'export',
  experimental:false,
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "s.gravatar.com",
      "fakestoreapi.com",
    ],
    unoptimized: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports = nextConfig;
