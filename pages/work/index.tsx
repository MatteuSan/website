import React from 'react';
import { NextPage } from 'next';
import DefaultLayout from '../../layouts/DefaultLayout';
import { MSAnimatedSection, MSButton, MSCard } from '../../components';

import { works } from '../../constants/works';
import { stagger } from '../../lib/helpers';

const itemsWithoutArchived = works.filter((item) => item?.status != 'Archived');
const itemsWithArchived = works.filter((item) => item?.status == 'Archived');

const cleanedItems = itemsWithoutArchived.concat(itemsWithArchived);

const WorkPage: NextPage = () => {
  return (
    <DefaultLayout title="WORK" heroTitle="Works" heroSubtitle="Projects made for clients, and for myself :)" hasHero>
      <section className="content-section">
        <MSAnimatedSection delay={0} stagger={0.2} className="grid cols-1 @medium:cols-2 @large:cols-3 gap-lg" id="projects">
          <>
            { cleanedItems.map((item: any, key: number) => {
              return (
                <MSCard
                  delay={0.1 + stagger(key, 0.1)}
                  key={ key }
                  title={ item.name }
                  description={ item.desc }
                  media={ `/img/` + item.media }
                  tags={ item.tags }
                  isArchived={ item.status == 'Archived' }
                >
                  { item.slug != null ? <MSButton link={ `/work/${item.slug}` } type="outlined">View project details</MSButton> : null }
                  { !item.slug && item.link != null ? <MSButton link={ item.link } type="outlined">Visit</MSButton> : null }
                </MSCard>
              );
            }) }
          </>
        </MSAnimatedSection>
      </section>
    </DefaultLayout>
  );
};

export default WorkPage;