/** @type {import('next').NextConfig} */
const nextConfig = {
  // crossOrigin: "anonymous",
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      "oaidalleapiprodscus.blob.core.windows.net",
      "cdn.openai.com",
      "avatars.githubusercontent.com",
    ],
  },
};

module.exports = nextConfig;
