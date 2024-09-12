/** @type {import('next').NextConfig} */
const nextConfig = {


    env: {
        SECRET_KEY: process.env.SECRET_KEY,
        distDir: 'build',
    },


};

export default nextConfig;
