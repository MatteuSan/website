import React, { useState } from 'react';
import Head from 'next/head';
import { m } from 'framer-motion';

import {
  MSHeader,
  MSNavbar,
  HCNavbarTrigger,
  HCNavbarItem,
  MSFooter,
} from '../components';

import { site } from '@/constants/site';
import { animateVariants } from '@/lib/framer';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRouter } from 'next/router';

interface DefaultLayoutProps {
  title?: string;
  description?: string;
  hasHero?: boolean;
  previewImage?: string;
  children: React.ReactNode;
}

interface MainContentProps extends React.ComponentPropsWithRef<any> {
  className?: string;
  children: React.ReactNode;
  constrained?: boolean;
}

const ogImageMap = {
  'home': '/img/og-image-home.webp',
  'work': '/img/og-image-work.webp',
  'tools': '/img/og-image-tools.webp',
};

export const MainContent: React.FC<MainContentProps> = ({ className, children, constrained = true, ...props }) => {
  return (
    <main className={`${ constrained ? 'content-wrap' : '' }${ className ? ' ' + className : '' }`} {...props}>
      { children }
    </main>
  );
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ title, description, hasHero = false, previewImage, children }) => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const router = useRouter();

  // @ts-ignore
  const ogImage: string = ogImageMap[title ? title.toLowerCase() : 'home'];

  const contentVariants = {
    initial: {
      opacity: 0,
      // y: 50,
    },
    enter: {
      opacity: 1,
      // y: 0,
      transition: {
        duration: 1,
        easings: [0.83, 0, 0.17, 1]
      }
    },
    exit: {
      opacity: 0
    }
  };

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from('.ms-header', {
      opacity: 0,
      top: '-100%',
      duration: 0.7,
      ease: 'power2.out',
    });

    tl.from('.ms-footer', {
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
    });

    tl.call(() => tl.revert() as unknown as void);
  });

  return (
    <>
      <Head>
        <meta name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0"/>

        <title>{ title ? title + ' - ' +  site.name : site.name }</title>
        <meta property="description" content={ description || `UX Engineer. Creating bridges from software to user.` }/>
        <meta name="description" content={ description || `UX Engineer. Creating bridges from software to user.` }/>

        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png"/>
        <link rel="icon" type="img/png" sizes="32x32" href="/favicons/favicon-32x32.png"/>
        <link rel="icon" type="img/png" sizes="16x16" href="/favicons/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>

        <meta property="og:title" content={ title ? title + ' - ' +  site.name : site.name }/>
        <meta property="og:description"
              content={ description || `UX Engineer. Creating bridges from software to user.` }/>
        <meta property="og:type" content="website"/>
        <meta property="og:image" content={ previewImage ? previewImage : ogImage }/>
        <meta property="og:url" content={ site.url }/>

        <meta name="twitter:title" content={ title ? title + ' - ' +  site.name : site.name }/>
        <meta name="twitter:description"
              content={ description || `UX Engineer. Creating bridges from software to user.` }/>
        <meta name="twitter:image" content={ previewImage ? previewImage : ogImage }/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:site" content={ site.twitter }/>
        <meta name="theme-color" content={ site.themeColor }/>

      </Head>
      <MSHeader title={ site.name } actionSection={
        <div className="flex flow-column wrap-none ai-end gap-md">
          <HCNavbarTrigger
            onClick={ () => setIsNavbarOpen(!isNavbarOpen) }
            trigger={ isNavbarOpen }
          />
          <MSNavbar trigger={ isNavbarOpen }>
            <HCNavbarItem link={router.pathname !== '/' ? '/#about-me' : '#about-me'}>
              <span>About Me</span>
              <span aria-hidden className="family-mono de-emphasize wrap-brackets">01</span>
            </HCNavbarItem>
            <HCNavbarItem link={router.pathname !== '/' ? '/#services' : '#services'}>
              <span>Services</span>
              <span aria-hidden className="family-mono de-emphasize wrap-brackets">02</span>
            </HCNavbarItem>
            <HCNavbarItem link={router.pathname !== '/' ? '/#works' : '#works'}>
              <span>Works</span>
              <span aria-hidden className="family-mono de-emphasize wrap-brackets">03</span>
            </HCNavbarItem>
            <HCNavbarItem link={router.pathname !== '/' ? '/#contact' : '#contact'}>
              <span>Contact</span>
              <span aria-hidden className="family-mono de-emphasize wrap-brackets">04</span>
            </HCNavbarItem>
          </MSNavbar>
        </div>
      } isScrollable={hasHero} />
      <m.section id="content" {...animateVariants(contentVariants)}>
        { children }
      </m.section>
      <MSFooter title={ site.name } version={ site.version } author={ site.author } />
    </>
  );
};