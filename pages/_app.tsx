import React from 'react';
import type { AppProps } from 'next/app';
import { Analytics } from "@vercel/analytics/react"
import { appWithTranslation } from 'next-i18next';
import { AnimatePresence } from 'framer-motion';
import ReactLenis from 'lenis/react';

import '../scss/main.scss';


function App({ Component, pageProps, router }: AppProps) {
  const BANNED_ROUTES = ['/404', '/_error', '/500'];

  return (
    <ReactLenis root options={{ autoResize: true }}>
      <AnimatePresence mode="wait">
        <Component key={router.route} {...pageProps} />
        { !BANNED_ROUTES.includes(router.route) ? <Analytics/> : null }
      </AnimatePresence>
    </ReactLenis>
  );
}

export default appWithTranslation(App);