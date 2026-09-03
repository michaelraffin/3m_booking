/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,

    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "localflowershop.sgp1.digitaloceanspaces.com",
      },
      {
        protocol: "https",
        hostname: "localflowershop.sgp1.cdn.digitaloceanspaces.com",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "i.postimg.cc",
      },
    ],
  },
};

module.exports = nextConfig;
