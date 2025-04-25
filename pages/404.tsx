import React from 'react';
import { NextPage } from 'next';
import { BlankLayout } from '@/layouts/BlankLayout';
import { MSButton, MSCard } from '@/components';
import Link from 'next/link';

const NotFound: NextPage = () => {
  return (
    <BlankLayout title="Error - 404" description="Page not found.">
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
    </BlankLayout>
  );
};

export default NotFound;