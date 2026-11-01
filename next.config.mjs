/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets announcement images from Cloudinary show on the site.
  images: { remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }] },
};
export default nextConfig;
