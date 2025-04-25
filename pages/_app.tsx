import React from 'react';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import { AnimatePresence, domAnimation, LazyMotion, MotionConfig } from 'framer-motion';
import ReactLenis from 'lenis/react';

import '../scss/main.scss';

function App({ Component, pageProps, router }: AppProps) {
  return (
    <ReactLenis root options={{ autoResize: true }}>
      <MotionConfig reducedMotion="user">
        <LazyMotion features={domAnimation}>
          <AnimatePresence mode="wait">
            <Component key={router.route} {...pageProps} />
            <Analytics key="analytics" mode="production" />
          </AnimatePresence>
        </LazyMotion>
      </MotionConfig>
    </ReactLenis>
  );
}

export default App;