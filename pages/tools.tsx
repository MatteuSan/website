import React from 'react';
import { NextPage } from 'next';
import DefaultLayout from './layouts/DefaultLayout';
import { MSButton, MSCard } from '../components';

import { tools } from '../constants/tools';
import { stagger } from "../lib/helpers";

const itemsWithoutArchived: any = tools.filter((item) => !item.tags.includes('Archived') && !item.tags.includes('Deprecated'));
const itemsWithArchived: any = tools.filter((item) => item.tags.includes('Archived') || item.tags.includes('Deprecated'));

const cleanedItems = itemsWithoutArchived.concat(itemsWithArchived);

const ToolsPage: NextPage = () => {
  return (
    <DefaultLayout title="TOOLS" heroTitle="Tools"
                   heroSubtitle="Empowering teams (and you!) to build better user experiences." hasHero>
      <section className="content-section">
        {/*<div className="flex flow-row no-wrap jc-end ai-center mb-lg">
          <MSButton type="small outlined">Filter</MSButton>
        </div>*/}
        <div className="grid cols-1 @medium:cols-2 @large:cols-3 gap-lg" id="projects">
          <>
            { cleanedItems.map((item: any, key: any) => {
              return (
                <MSCard
                  delay={0.1 + stagger(key, 0.1)}
                  key={ key }
                  title={ item.name }
                  description={ item.desc }
                  tags={ item.tags }
                >
                  { item.links.src != null ? <MSButton link={ item.links.src } type="outlined">Source</MSButton> : null }
                  { item.links.docs != null ? <MSButton link={ item.links.docs } type="outlined">Docs</MSButton> : null }
                </MSCard>
              );
            }) }
          </>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default ToolsPage;