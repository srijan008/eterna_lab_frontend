/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Twitter / X images
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
      },

      // Jupiter official logos
      {
        protocol: "https",
        hostname: "static.jup.ag",
      },

      // Raydium lists
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },

      // Pump.fun CDN
      {
        protocol: "https",
        hostname: "images.pump.fun",
      },
      {
        protocol: "https",
        hostname: "*.pump.fun",
      },

      // Cloudflare Image Delivery (NEW)
      {
        protocol: "https",
        hostname: "imagedelivery.net",
      },

      // IPFS gateways
      {
        protocol: "https",
        hostname: "ipfs.io",
      },
      {
        protocol: "https",
        hostname: "cloudflare-ipfs.com",
      },

      // Wildcard IPFS (nftstorage)
      {
        protocol: "https",
        hostname: "*.ipfs.nftstorage.link",
      },

      // Arweave metadata
      {
        protocol: "https",
        hostname: "arweave.net",
      },

      // Another token CDN
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },

      // Helius
      {
        protocol: "https",
        hostname: "api.helius.xyz",
      },
    ],
  },
};

module.exports = nextConfig;
