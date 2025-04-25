import React from 'react';
import { NextPage } from 'next';
import { MSButton, MSCard } from '@/components';
import Link from 'next/link';
import Head from 'next/head';

const ServerError: NextPage = () => {
  return (
    <>
      <Head>
        <title>Error - 500</title>
        <meta name="description" content="Internal server error." />
      </Head>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1>Error 500</h1>
        <p>Something went wrong on server. Please try again later.</p>
        <Link href="/">Return home</Link>
      </div>
    </>
  );
};

export default ServerError;