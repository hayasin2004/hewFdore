/** @type {import('next').NextConfig} */

const nextConfig = {

    env: {
        SECRET_KEY: process.env.SECRET_KEY,
        distDir: 'build',
    },
    images: {
        domains: ['images.microcms-assets.io'],//ここを追加
    },
};

export default nextConfig;
