import type { AppProps } from 'next/app';
import React from 'react';
import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion';
import { appWithTranslation } from 'next-i18next';

import '../scss/main.scss';

function App({ Component, pageProps }: AppProps) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={ domAnimation }>
        <Component { ...pageProps } />
      </LazyMotion>
    </MotionConfig>
  );
}

export default appWithTranslation(App);