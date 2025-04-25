import createMDX from '@next/mdx';
import { NodePackageImporter } from 'sass';

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    importers: [new NodePackageImporter()],
    verbose: true,
    loadPaths: ['node_modules'],
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
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
    remarkPlugins: [['remark-gfm']],
    rehypePlugins: [['@shikijs/rehype', {
      theme: 'vitesse-dark'
    }]],
  },
})

export default withMDX(nextConfig)
