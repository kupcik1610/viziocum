/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  // The captured Joomla markup is rendered verbatim; skip strict checks.
  reactStrictMode: false,
};

export default nextConfig;
