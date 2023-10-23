/** @type {import('next').NextConfig} */
const nextConfig = {
  output:'export',
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "s.gravatar.com",
      "fakestoreapi.com",
    ],
    unoptimized: true,
  },
  basePath:'/user-auth',
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports = nextConfig;
