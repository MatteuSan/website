import React from 'react';
import { NextPage } from 'next';
import DefaultLayout from './layouts/DefaultLayout';
import { MSButton, MSCard } from '../components';

import { tools } from '../constants/tools';

const ToolsPage: NextPage = () => {
  return (
    <DefaultLayout title="TOOLS" heroTitle="Tools"
                   heroSubtitle="Tools I made to help me, and dev teams (and you!) build user experiences." hasHero>
      <section className="content-section">
        <div className="grid cols-1 @medium:cols-2 @large:cols-3 gap-lg" id="projects">
          { tools.map((data, key) => {
            return (
              <MSCard
                key={ key }
                title={ data.name }
                description={ data.desc }
                tags={ data.tags }
              >
                { data.links.src != null ? <MSButton link={ data.links.src } type="outlined">Source</MSButton> : null }
                { data.links.docs != null ? <MSButton link={ data.links.docs } type="outlined">Docs</MSButton> : null }
              </MSCard>
            );
          }) }
        </div>
      </section>
    </DefaultLayout>
  );
};

export default ToolsPage;