import React from 'react';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import { AnimatePresence, domAnimation, LazyMotion, MotionConfig } from 'framer-motion';

import '../scss/main.scss';

function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <MotionConfig reducedMotion="user">
        <LazyMotion features={domAnimation}>
          <AnimatePresence mode="wait">
            <Component key={router.route} {...pageProps} />
          </AnimatePresence>
        </LazyMotion>
      </MotionConfig>
      <Analytics key="analytics" mode="auto" />
    </>
  );
}

export default App;