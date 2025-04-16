import React, { useEffect, useRef } from 'react';
import { appWithTranslation } from 'next-i18next';
import { ReactLenis } from 'lenis/react';
import { gsap } from 'gsap';

import type { AppProps } from 'next/app';
import '../scss/main.scss';
import { useRouter } from "next/router";

function App({ Component, pageProps }: AppProps) {
  const lenisRef = useRef<any>();
  const currentRoute = `${useRouter().pathname}`;

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
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
      <Component { ...pageProps } />
    </ReactLenis>
  );
}

export default appWithTranslation(App);