import React from 'react';
import type { NextPage } from 'next';
import { DefaultLayout, MainContent } from '@/layouts/DefaultLayout';

import { works } from '@/constants/works';

import AboutMeSection from "@/components/pages/home/AboutMeSection";
import ServiceSection from "@/components/pages/home/ServiceSection";
import WorksSection from "@/components/pages/home/WorksSection";
import CTASection from "@/components/pages/home/CTASection";

const workItemsWithSlug = works.filter((item) => item?.slug != null);
const workItemsWithoutSlug = works.filter((item) => item?.slug == null);
const workCleanedItems = workItemsWithSlug.concat(workItemsWithoutSlug);

const finalWorks = [
  ...workCleanedItems.slice(0, 6)
]

const HomePage: NextPage = () => {
  return (
    <DefaultLayout hasHero>
      <AboutMeSection />
      <MainContent constrained={false}>
        <ServiceSection />
        <WorksSection works={ finalWorks } />
        <CTASection />
      </MainContent>
    </DefaultLayout>
  );
};

export default HomePage;
