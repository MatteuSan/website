import React from 'react';
import { NextPage } from 'next';
import BlankLayout from '../layouts/BlankLayout';
import { MSButton, MSCard, MSCardFooter, MSCardHeader } from '../components';

const NotFound: NextPage = () => {
  return (
    <BlankLayout title="404 Page Not Found" description="404 - Page Not Found">
      <section className="absolute-center">
        <div className="page-error">
          <MSCard title="404" description="Page not found...">
            <MSCardHeader title="404" subtitle="Page not found..." />
            <MSCardFooter>
              <MSButton link="/" type="filled">Return home</MSButton>
            </MSCardFooter>
          </MSCard>
        </div>
      </section>
    </BlankLayout>
  );
};

export default NotFound;