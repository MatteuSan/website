import React from 'react';
import { NextPage } from 'next';
import { MSButton, MSCard } from '../components';
import Link from 'next/link';
import Head from 'next/head';

const NotFound: NextPage = () => {
  return (
    <>
      <Head>
        <title>Error - 404</title>
        <meta name="description" content="Page not found." />
      </Head>
      <section className="constrained h-screen grid pi-center">
        <div className="w-full" style={{ maxWidth: 570 }}>
          <MSCard>
            <div className="p-xl">
              <h1 className="family-supertitle size-4xl letter-spacing-condensed text-center text-surface-ink">
                Error 404
              </h1>
              <p>The page you were looking for was not found. Maybe you've mistyped the URL?</p>
            </div>
            <div className="px-xl pb-xl">
              <MSButton link="/" type="filled large full-width">Return home</MSButton>
              <small className="block mt-md">If the problem still persists, please contact me at <Link className="ms-link" href="mailto:matt@matteusan.com?subject=There's something wrong on the website">matt@matteusan.com</Link>.</small>
            </div>
          </MSCard>
        </div>
      </section>
    </>
  );
};

export default NotFound;