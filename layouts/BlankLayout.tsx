import React from 'react';
import Head from 'next/head';
import { site } from '@/constants/site';
import { animateVariants } from '@/lib/framer';
import { m } from 'framer-motion';

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

export const BlankLayout: React.FC<BlankLayoutProps> = ({ title, description, previewImage, children }) => {
  // @ts-ignore
  const ogImage: string = ogImageMap[title.toLowerCase()];

  const variants = {
    initial: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
      transition: {
        duration: 1
      }
    },
    exit: {
      opacity: 0
    }
  };

  return (
    <>
      <Head>
        <meta name="viewport"
              content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>

        <title>{ title } - { site.name }</title>
        <meta property="description"
              content={ description || `UX Engineer. Creating a meaningful bridge from software to user.` }/>

        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png"/>
        <link rel="icon" type="img/png" sizes="32x32" href="/favicons/favicon-32x32.png"/>
        <link rel="icon" type="img/png" sizes="16x16" href="/favicons/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>

        <meta property="og:title" content={ `${ title } - ${ site.name }` }/>
        <meta property="og:description"
              content={ description || `UX Engineer. Creating a meaningful bridge from software to user.` }/>
        <meta property="og:type" content="website"/>
        <meta property="og:image" content={ previewImage ? previewImage : ogImage }/>
        <meta property="og:url" content={ site.url }/>

        <meta name="twitter:title" content={ `${ title } - ${ site.name }` }/>
        <meta name="twitter:description"
              content={ description || `UX Engineer. Creating a meaningful bridge from software to user.` }/>
        <meta name="twitter:image" content={ previewImage ? previewImage : ogImage }/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:site" content={ site.twitter }/>

        <meta name="theme-color" content={ site.themeColor }/>
      </Head>
      <m.section { ...animateVariants(variants)}>
        { children }
      </m.section>
    </>
  );
};