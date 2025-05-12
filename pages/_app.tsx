import React from 'react';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import { AnimatePresence, domAnimation, LazyMotion, MotionConfig } from 'framer-motion';

import '../scss/main.scss';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { SplitText } from 'gsap/dist/SplitText';
import { SpeedInsights } from '@vercel/speed-insights/next';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

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
      <SpeedInsights />
    </>
  );
}

export default App;