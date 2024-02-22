import React from 'react';
import { NextPage } from 'next';
import DefaultLayout from './layouts/DefaultLayout';
import { HCButton, HCCard } from '../components';

import { tools } from '../constants/tools';

const ToolsPage: NextPage = () => {
  return (
    <DefaultLayout title="TOOLS" heroTitle="Tools"
                   heroSubtitle="Tools I made to help me, and dev teams (and you!) build user experiences." hasHero>
      <section className="content-section">
        <div className="grid is-3" id="projects">
          { tools.map((data, key) => {
            return (
              <HCCard
                key={ key }
                title={ data.name }
                description={ data.desc }
                tags={ data.tags }
              >
                { data.links.src != null ? <HCButton link={ data.links.src } type="outlined">Source</HCButton> : null }
                { data.links.docs != null ? <HCButton link={ data.links.docs } type="outlined">Docs</HCButton> : null }
              </HCCard>
            );
          }) }
        </div>
      </section>
    </DefaultLayout>
  );
};

export default ToolsPage;