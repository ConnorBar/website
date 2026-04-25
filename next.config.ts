import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "lastfm.freetls.fastly.net" },
      { hostname: "i.scdn.co" }, // Spotify album art
      { hostname: "is1-ssl.mzstatic.com" }, // Apple Music artwork
      { hostname: "is2-ssl.mzstatic.com" },
      { hostname: "is3-ssl.mzstatic.com" },
      { hostname: "is4-ssl.mzstatic.com" },
      { hostname: "is5-ssl.mzstatic.com" },
    ],
  },
};

export default nextConfig;
