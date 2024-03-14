import React from 'react';
import Head from 'next/head';
import { site } from '../constants/site';

interface BlankLayoutProps {
  title: string;
  description?: string;
  previewImage?: string;
  children: React.ReactNode;
}

const ogImageMap = {
  'home': '/img/og-image-home.webp',
  'work': '/img/og-image-work.webp',
  'tools': '/img/og-image-tools.webp',
  // TODO: Change this to -blog when done building the page.
  'blog': '/img/og-image-home.webp',
};

const BlankLayout: React.FC<BlankLayoutProps> = ({ title, description, previewImage, children }) => {
  // @ts-ignore
  const ogImage: string = ogImageMap[title.toLowerCase()];

  return (
    <>
      <Head>
        <meta name="viewport"
              content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />

        <title>{ title } - { site.name }</title>
        <meta property="description"
              content={ description || `UX Engineer. Creating a meaningful bridge from software to user.` } />

        <link
          href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
          rel="stylesheet" />

        <link rel="apple-touch-icon" sizes="180x180" href={ `/img/favicon.webp` } />
        <link rel="icon" type="img/png" sizes="32x32" href={ `/img/favicon.webp` } />
        <link rel="icon" type="img/png" sizes="16x16" href={ `/img/favicon.webp` } />

        <meta property="og:title" content={ `${ title } - ${ site.name }` } />
        <meta property="og:description"
              content={ description || `UX Engineer. Creating a meaningful bridge from software to user.` } />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={ previewImage ? previewImage : ogImage } />
        <meta property="og:url" content={ site.url } />

        <meta name="twitter:title" content={ `${ title } - ${ site.name }` } />
        <meta name="twitter:description"
              content={ description || `UX Engineer. Creating a meaningful bridge from software to user.` } />
        <meta name="twitter:image" content={ previewImage ? previewImage : ogImage } />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={ site.twitter } />

        <meta name="theme-color" content={ site.themeColor } />
      </Head>
      { children }
    </>
  );
};

export default BlankLayout;