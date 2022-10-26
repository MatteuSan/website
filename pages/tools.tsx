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
        <div className="grid" id="projects">
          { tools.map((data, key) => {
            return (
              <HCCard
                key={ key }
                title={ data.name }
                description={ data.desc }
                tags={ data.tags }
              >
                <HCButton link={ data.links.src } type="outlined"
                          isDisabled={ data.links.src == null }>Source</HCButton>
                <HCButton link={ data.links.docs } type="filled" isDisabled={ data.links.docs == null }>Docs</HCButton>
              </HCCard>
            );
          }) }
        </div>
      </section>
    </DefaultLayout>
  );
};

export default ToolsPage;