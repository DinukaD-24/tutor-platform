/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true, // enable gzip/brotli — critical for reducing 6.6MB uncompressed HTML
  serverExternalPackages: ["@prisma/client", "pg", "@prisma/adapter-pg"],
};


export default nextConfig;
