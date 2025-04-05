/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  logging: { fetches: { fullUrl: true } },
  env: {
    // APPLICATION VARIABLE
    APP_NAME: process.env.APP_NAME,
    API_BASE_URL: process.env.API_BASE_URL,
    API_SUFFIX_URL: process.env.API_SUFFIX_URL,
    APP_ANALYZE: process.env.APP_ANALYZE,
    BLOG_SITE_URL: process.env.BLOG_SITE_URL,
    // GOOGLE RE-CAPTCHA v3
    CAPTCHA_SITE_KEY: process.env.CAPTCHA_SITE_KEY,
    CAPTCHA_SECRET_KEY: process.env.CAPTCHA_SECRET_KEY,
  },
};

// Next.js Bundle Analyzer
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.APP_ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);
