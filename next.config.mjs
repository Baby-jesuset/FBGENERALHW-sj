/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production optimizations
  compress: true,
  poweredByHeader: false, // Security: Remove X-Powered-By header
  reactStrictMode: true,
   // Enable SWC minification
  
  // Image optimization (IMPORTANT: Remove unoptimized flag for production)
  images: {
    unoptimized: false, // Set to false for production
    formats: ['image/avif', 'image/webp'],
    domains: [
      'auxhnpndxisbzizklbzu.supabase.co', // Your Supabase storage
      'localhost',
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Only ignore build errors during development
  // For production, fix all errors instead
  eslint: {
    ignoreDuringBuilds: false, // Changed to false for production
  },
  typescript: {
    ignoreBuildErrors: false, // Changed to false for production
  },
}

export default nextConfig
