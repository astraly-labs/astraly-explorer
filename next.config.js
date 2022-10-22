/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: '/bee.js',
        destination: 'https://cdn.splitbee.io/sb.js',
      },
      {
        source: '/_hive/:slug',
        destination: 'https://hive.splitbee.io/:slug',
      },
    ];
  },
  webpack: function (config) {
    const fileLoader = {
      loader: 'file-loader',
      options: {
        outputPath: '../public/assets/',
        publicPath: '/assets/',
      },
    };

    config.module.rules.push({
      test: /\.svg$/,
      oneOf: [
        {
          resourceQuery: /inline/,
          loader: '@svgr/webpack',
        },
        {
          ...fileLoader,
        },
      ],
    });
    return config;
  },
};

module.exports = nextConfig;
