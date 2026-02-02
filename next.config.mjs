/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // For the placeholder images
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // For your future real images
      },
      { protocol: 'https', hostname: 'ui-avatars.com' },
      
    
    ],
  },
};

export default nextConfig;