/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['lh3.googleusercontent.com'], // 複数のドメインを追加
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'thumbnail.image.rakuten.co.jp',
      },
    ],
  },
}
