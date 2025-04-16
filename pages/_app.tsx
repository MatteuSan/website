import React, { useEffect, useRef } from 'react';
import { appWithTranslation } from 'next-i18next';
import { ReactLenis } from 'lenis/react';
import { gsap } from 'gsap';

import type { AppProps } from 'next/app';
import '../scss/main.scss';

function App({ Component, pageProps }: AppProps) {
  const lenisRef = useRef<any>();

  useEffect(() => {
    function update(time: any) {
      lenisRef.current?.lenis?.raf(time * 550)
    }
    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
      <Component { ...pageProps } />
    </ReactLenis>
  );
}

export default appWithTranslation(App);