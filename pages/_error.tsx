import React from 'react';
import { NextPage } from 'next';
import BlankLayout from '@/layouts/BlankLayout';
import { MSButton, MSCard } from '@/components';

const ERRORS: { [key: number]: string } = {
  400: 'Bad Request',
  401: 'Unauthorized access',
  403: 'Forbidden access',
  404: 'Page not found',
  500: 'Internal Server Error',
};

// @ts-ignore
const Error: NextPage = ({ statusCode, message }) => {
  return (
    <BlankLayout title={`Error - ${ statusCode }`} description={message}>
      <section className="constrained h-screen grid pi-center">
        <div className="w-full" style={{ maxWidth: 570 }}>
          <MSCard>
            <div className="p-xl">
              <h1 className="family-supertitle size-4xl letter-spacing-condensed text-center text-surface-ink">
                Error: { statusCode }
              </h1>
              <p>{statusCode
                ? message
                : 'An error occurred on client'}.</p>
            </div>
            <div className="p-xl">
              <MSButton link="/" type="filled large full-width">Return home</MSButton>
            </div>
          </MSCard>
        </div>
      </section>
    </BlankLayout>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  const message = res ? ERRORS[res.statusCode] : err ? err.message : 'An error occurred on client.';
  return { statusCode, message }
}

export default Error;