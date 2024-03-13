import React from 'react';
import { NextPage } from 'next';
import BlankLayout from './layouts/BlankLayout';
import { MSButton, MSCard } from '../components';

const NotFound: NextPage = () => {
  return (
    <BlankLayout title="404 Page Not Found" description="404 - Page Not Found">
      <section className="absolute-center">
        <div className="page-error">
          <MSCard title="404" description="Page not found...">
            <MSButton link="/" type="filled">Return home</MSButton>
          </MSCard>
        </div>
      </section>
    </BlankLayout>
  );
};

export default NotFound;