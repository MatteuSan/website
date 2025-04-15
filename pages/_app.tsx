import React from 'react';
import { appWithTranslation } from 'next-i18next';
import { ReactLenis, useLenis } from 'lenis/react';

import type { AppProps } from 'next/app';
import '../scss/main.scss';

function App({ Component, pageProps }: AppProps) {
  return (
    <ReactLenis root>
      <Component { ...pageProps } />
    </ReactLenis>
  );
}

export default appWithTranslation(App);