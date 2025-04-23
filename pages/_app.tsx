import React, { useState } from 'react';
import type { AppProps } from 'next/app';
import { Analytics } from "@vercel/analytics/react"
import { appWithTranslation } from 'next-i18next';
import { AnimatePresence } from 'framer-motion';
import ReactLenis from 'lenis/react';

import { MotionProvider } from '@/stores/accessibility';
import '../scss/main.scss';


function App({ Component, pageProps, router }: AppProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  return (
    <MotionProvider value={{ prefersReducedMotion, setPrefersReducedMotion }}>
      <AnimatePresence mode="wait">
        <ReactLenis root options={{ autoResize: true }}>
          <Component key={router.route} { ...pageProps } />
          <Analytics />
        </ReactLenis>
      </AnimatePresence>
    </MotionProvider>
  );
}

export default appWithTranslation(App);