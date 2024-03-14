import React, { useState } from 'react';
import Head from 'next/head';

import {
  MSHeader,
  MSHero,
  MSNavbar,
  HCNavbarTrigger,
  HCNavbarItem,
  MSFooter,
} from '../../components';

import { site } from '../../constants/site';

interface DefaultLayoutProps {
  title: string;
  description?: string;
  hasHero?: boolean;
  hasHeroAction?: boolean;
  heroTitle: string;
  heroSubtitle: string;
  heroAction?: any;
  children: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ title, description, hasHero = false, heroTitle, heroSubtitle, heroAction, children }) => {

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  return (
    <>
      <Head>
        <meta name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0"/>

        <title>{ title } - { site.name }</title>
        <meta property="description" content={ description || `UX Engineer. Creating bridges from software to user.` }/>
        <meta name="description" content={ description || `UX Engineer. Creating bridges from software to user.` }/>

        <link rel="apple-touch-icon" sizes="180x180" href={ `${ site.url }/img/favicon.png` }/>
        <link rel="icon" type="img/png" sizes="32x32" href={ `${ site.url }/img/favicon.png` }/>
        <link rel="icon" type="img/png" sizes="16x16" href={ `${ site.url }/img/favicon.png` }/>

        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp&display=optional"
          rel="stylesheet"/>

        <meta property="og:title" content={ `${ title } - ${ site.name }` }/>
        <meta property="og:description"
              content={ description || `UX Engineer. Creating bridges from software to user.` }/>
        <meta property="og:type" content="website"/>
        <meta property="og:image" content={ `${ site.url }/img/og-image-home.png` }/>
        <meta property="og:url" content={ site.url }/>

        <meta name="twitter:title" content={ `${ title } - ${ site.name }` }/>
        <meta name="twitter:description"
              content={ description || `UX Engineer. Creating bridges from software to user.` }/>
        <meta name="twitter:image" content={ `${ site.url }/img/favicon.png` }/>
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
            <HCNavbarItem link="https://github.com/MatteuSan">GitHub</HCNavbarItem>
          </MSNavbar>
        </>
      } isScrollable />
      { hasHero && <MSHero title={ heroTitle } subtitle={ heroSubtitle } action={ heroAction } /> }
      <main className="content-wrap">
        { children }
      </main>
      <MSFooter title={ site.name } version={ site.version } author={ site.author } />
    </>
  );
};

export default DefaultLayout;