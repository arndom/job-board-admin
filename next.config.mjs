/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        hostname: "flagcdn.com"
      }
    ]
  }
};

export default nextConfig;
