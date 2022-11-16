/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains:["lh3.googleusercontent.com","s.gravatar.com",'fakestoreapi.com']
    // remotePatterns: [
    //   { protocol: "https", hostname: "s.gravatar.com" },
    //   {
    //     protocol: "https",
    //     hostname: "lh3.googleusercontent.com"
        
    //   },
    //   {
    //     protocol: "https",
    //     hostname:'fakestoreapi.com'
    //   }
    // ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports = nextConfig;
