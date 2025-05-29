import type { MDXComponents } from 'mdx/types'
import React from "react";
import Image, { ImageProps } from "next/image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  const handleId = (string?: string) => {
    if (!string) return '';
    return string.replaceAll(/[^a-zA-Z ]/g, '').replaceAll(' ', '-').toLowerCase();
  }

  return {
    h1: ({ children }) => {
      return <h1 className="supertitle mb-md" id={handleId(children?.toString())}>{ children }</h1>;
    },
    h2: ({ children }) => {
      return <h2 className="title mt-lg mb-md" id={handleId(children?.toString())}>{ children }</h2>;
    },
    h3: ({ children }) => {
      return <h3 className="subtitle mt-lg mb-md" id={handleId(children?.toString())}>{ children }</h3>;
    },
    h4: ({ children }) => <h4 className="subtitle mt-md mb-sm size-sm" id={handleId(children?.toString())}>{children}</h4>,
    p: ({ children }) => <p className="size-body mb-md" style={{ lineHeight: '1.6' }}>{children}</p>,
    a: ({ children, href }) => {
      const isLinkExternal: boolean|undefined = href?.startsWith('http') || href?.startsWith('mailto') || href?.startsWith('tel') || href?.startsWith('sms') || href?.startsWith('tg');

      return (
        <a href={href}
           className="ms-link"
           target={isLinkExternal ? '_blank' : '_self'}
           rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    },
    img: (props) => {
      return (
        <Image
          width={1920}
          height={1080}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          className="r-lg"
          decoding="async"
          loading="lazy"
          { ...(props as ImageProps) }
        />
      );
    },
    ...components,
  }
}