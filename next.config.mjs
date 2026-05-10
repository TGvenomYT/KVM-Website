import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const repoSegment = process.env.GITHUB_REPOSITORY?.split("/")[1];
const hasCustomDomain = fs.existsSync(path.join(__dirname, "public", "CNAME"));
const useBasePath = !!(process.env.GITHUB_ACTIONS && repoSegment && !hasCustomDomain);
const basePath = useBasePath ? `/${repoSegment}` : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : "",
  outputFileTracingRoot: __dirname,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
};

export default nextConfig;
