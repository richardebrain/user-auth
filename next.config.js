/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "s.gravatar.com",
      "fakestoreapi.com",
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  output:'export'
};

module.exports = nextConfig;
