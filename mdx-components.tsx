import type { MDXComponents } from 'mdx/types';
import Image, { ImageProps } from "next/image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="supertitle">{children}</h1>,
    h2: ({ children }) => <h2 className="title">{children}</h2>,
    h3: ({ children }) => <h3 className="subtitle">{children}</h3>,
    h4: ({ children }) => <h4 className="subtitle">{children}</h4>,
    p: ({ children }) => <p className="body mb-md">{children}</p>,
    img: (props) => {
      return (
        <Image
          width={1920}
          height={1080}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          className="r-lg"
          { ...(props as ImageProps) }
        />
      );
    },
    ...components,
  }
}