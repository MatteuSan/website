import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const NotFound: NextPage = () => {
  return (
    <>
      <Head>
        <title>Error - 404</title>
        <meta name="description" content="Page not found." />
      </Head>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1>Error 404</h1>
        <p>The page you were looking for was not found.</p>
        <Link href="/">Return home</Link>
      </div>
    </>
  );
};

export default NotFound;