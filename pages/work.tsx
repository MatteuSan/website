import React from 'react';
import { NextPage } from 'next';
import DefaultLayout from './layouts/DefaultLayout';
import { HCButton, HCCard } from '../components';

import { works } from '../constants/works';

const WorkPage: NextPage = () => {
  return (
    <DefaultLayout title="WORK" heroTitle="Works" heroSubtitle="Projects made for clients, and for myself :)" hasHero>
      <section className="content-section">
        <div className="grid is-3" id="projects">
          { works.map((data, key) => {
            return (
              <HCCard
                key={ key }
                title={ data.name }
                description={ data.desc }
                media={ `/img/` + data.media }
                tags={ data.tags }
              >
                { data.link != null ? <HCButton link={ data.link } type="outlined">Visit</HCButton> : null }
              </HCCard>
            );
          }) }
        </div>
      </section>
    </DefaultLayout>
  );
};

export default WorkPage;