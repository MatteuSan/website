import React, { useState } from 'react';
import Head from 'next/head';

import {
  MSHeader,
  MSHero,
  MSNavbar,
  HCNavbarTrigger,
  HCNavbarItem,
  MSFooter,
} from '../components';

import { site } from '../constants/site';

interface DefaultLayoutProps {
  title: string;
  description?: string;
  hasHero?: boolean;
  previewImage?: string;
  children: React.ReactNode;
}

const ogImageMap = {
  'home': '/img/og-image-home.webp',
  'work': '/img/og-image-work.webp',
  'tools': '/img/og-image-tools.webp',
};

export const MainContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main className="content-wrap">
      { children }
    </main>
  );
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ title, description, hasHero = false, previewImage, children }) => {

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  // @ts-ignore
  const ogImage: string = ogImageMap[title.toLowerCase()];

  return (
    <>
      <Head>
        <meta name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0"/>

        <title>{ title } - { site.name }</title>
        <meta property="description" content={ description || `UX Engineer. Creating bridges from software to user.` }/>
        <meta name="description" content={ description || `UX Engineer. Creating bridges from software to user.` }/>

        <link rel="preload" fetchPriority="high" as="image" href="/hero.svg" type="image/svg+xml"/>

        <link rel="apple-touch-icon" sizes="180x180" href={ `/img/favicon.webp` }/>
        <link rel="icon" type="img/png" sizes="32x32" href={ `/img/favicon.webp` }/>
        <link rel="icon" type="img/png" sizes="16x16" href={ `/img/favicon.webp` }/>

        <meta property="og:title" content={ `${ title } - ${ site.name }` }/>
        <meta property="og:description"
              content={ description || `UX Engineer. Creating bridges from software to user.` }/>
        <meta property="og:type" content="website"/>
        <meta property="og:image" content={ previewImage ? previewImage : ogImage }/>
        <meta property="og:url" content={ site.url }/>

        <meta name="twitter:title" content={ `${ title } - ${ site.name }` }/>
        <meta name="twitter:description"
              content={ description || `UX Engineer. Creating bridges from software to user.` }/>
        <meta name="twitter:image" content={ previewImage ? previewImage : ogImage }/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:site" content={ site.twitter }/>
        <meta name="theme-color" content={ site.themeColor }/>

      </Head>
      <MSHeader title={ site.name } actionSection={
        <>
          <HCNavbarTrigger
            onClick={ () => setIsNavbarOpen(!isNavbarOpen) }
            trigger={ isNavbarOpen }
          />
          <MSNavbar trigger={ isNavbarOpen }>
            <HCNavbarItem link="/">Home</HCNavbarItem>
            <HCNavbarItem link="/work">Work</HCNavbarItem>
            <HCNavbarItem link="/tools">Tools</HCNavbarItem>
            <HCNavbarItem link="/blog">Blog</HCNavbarItem>
            <HCNavbarItem link="https://github.com/MatteuSan">GitHub</HCNavbarItem>
          </MSNavbar>
        </>
      } isScrollable={hasHero} />
      { children }
      <MSFooter title={ site.name } version={ site.version } author={ site.author } />
    </>
  );
};