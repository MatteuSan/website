import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypeShiki from "@shikijs/rehype";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  i18n: {
    locales: ['en', 'jp'],
    defaultLocale: 'en',
    localeDetection: true,
  },
  async redirects() {
    return [
      {
        source: '/github',
        destination: 'https://github.com/MatteuSan',
        permanent: true,
      },
      {
        source: '/linkedin',
        destination: 'https://linkedin.com/in/matteusan',
        permanent: true,
      },
      {
        source: '/resume',
        destination: '/resources/Matthew-Hernandez_Resume.pdf',
        permanent: true,
      }
    ]
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypeShiki, {
      theme: 'vitesse-dark'
    }]],
  },
})

export default withMDX(nextConfig)
