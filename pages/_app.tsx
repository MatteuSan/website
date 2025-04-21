import React, { useEffect, useRef, useState } from 'react';
import { appWithTranslation } from 'next-i18next';
import { ReactLenis } from 'lenis/react';
import { gsap } from 'gsap';

import type { AppProps } from 'next/app';
import '../scss/main.scss';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { MotionProvider } from '@/stores/accessibility';

function App({ Component, pageProps, router }: AppProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const lenisRef = useRef<any>();
  const currentRoute = `${router.pathname}`;

  const ALLOWED_ROUTES = ['/', '/about', '/work', '/tools'];

  useEffect(() => {
    function update(time: any) {
      lenisRef.current?.lenis?.raf(time * 550)
    }
    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, []);

  if (!ALLOWED_ROUTES.includes(currentRoute)) {
    return (
      <Component { ...pageProps } />
    );
  }

  return (
    <MotionProvider value={{ prefersReducedMotion, setPrefersReducedMotion }}>
      <MotionConfig>
        <AnimatePresence mode="wait">
          <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
            <Component key={router.route} { ...pageProps } />
          </ReactLenis>
        </AnimatePresence>
      </MotionConfig>
    </MotionProvider>
  );
}

export default appWithTranslation(App);