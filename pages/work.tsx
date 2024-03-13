import React from 'react';
import { NextPage } from 'next';
import DefaultLayout from './layouts/DefaultLayout';
import { MSButton, MSCard } from '../components';

import { works } from '../constants/works';

const WorkPage: NextPage = () => {
  return (
    <DefaultLayout title="WORK" heroTitle="Works" heroSubtitle="Projects made for clients, and for myself :)" hasHero>
      <section className="content-section">
        <div className="grid cols-1 @medium:cols-2 @large:cols-3 gap-lg" id="projects">
          { works.map((data, key) => {
            return (
              <MSCard
                key={ key }
                title={ data.name }
                description={ data.desc }
                media={ `/img/` + data.media }
                tags={ data.tags }
              >
                { data.link != null ? <MSButton link={ data.link } type="outlined">Visit</MSButton> : null }
              </MSCard>
            );
          }) }
        </div>
      </section>
    </DefaultLayout>
  );
};

export default WorkPage;