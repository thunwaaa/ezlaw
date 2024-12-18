/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });
      return config;
    },
    images: {
      domains: ['res.cloudinary.com'],
    },
    devIndicators: {
      buildActivity: false, // ปิดสถานะ build
      autoPrerender: false, // ปิด autoPrerender indicator
    },
    // ปิด Error Overlay โดยตรง
    reactStrictMode: false, // ปิด strict mode ที่อาจทำให้แสดง error
  };
  
  export default nextConfig;
  