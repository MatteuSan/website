import React, { useEffect, useRef } from 'react';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import { AnimatePresence, domAnimation, LazyMotion, MotionConfig } from 'framer-motion';

import '../scss/main.scss';

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { SplitText } from 'gsap/dist/SplitText';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { LenisRef, ReactLenis } from 'lenis/react';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

function App({ Component, pageProps, router }: AppProps) {
  const lenisRef = useRef<LenisRef>();

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1300);
    }
    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, [])

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

      {/*<ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />*/}
    </>
  );
}

export default App;