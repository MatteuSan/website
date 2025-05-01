import React from 'react';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import { AnimatePresence, domAnimation, LazyMotion, MotionConfig } from 'framer-motion';

import '../scss/main.scss';
import ReactLenis from 'lenis/react';

function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <ReactLenis root options={{ autoRaf: true }}>
        <MotionConfig reducedMotion="user">
          <LazyMotion features={domAnimation}>
            <AnimatePresence mode="wait">
              <Component key={router.route} {...pageProps} />
            </AnimatePresence>
          </LazyMotion>
        </MotionConfig>
      </ReactLenis>
      <Analytics key="analytics" mode="auto" />
    </>
  );
}

export default App;