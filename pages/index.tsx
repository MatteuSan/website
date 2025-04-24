import React from 'react';
import type { NextPage } from 'next';
import { DefaultLayout, MainContent } from '@/layouts/DefaultLayout';

import {
  MSButton,
  MSHero,
} from '@/components';

import { works } from '@/constants/works';

import ServiceSection from "@/components/pages/home/ServiceSection";
import TechnologySection from "@/components/pages/home/TechnologySection";
import AboutMeSection from "@/components/pages/home/AboutMeSection";
import WorksSection from "@/components/pages/home/WorksSection";
import CTASection from "@/components/pages/home/CTASection";

const workItemsWithSlug = works.filter((item) => item?.slug != null);
const workItemsWithoutSlug = works.filter((item) => item?.slug == null);
const workCleanedItems = workItemsWithSlug.concat(workItemsWithoutSlug);

const new_works = workCleanedItems.slice(0, 5);

const HomePage: NextPage = () => {
  return (
    <DefaultLayout title="HOME" hasHero>
      <MSHero title="MatteuSan" subtitle={<>Creating bridges from <span className="italic family-supertitle">software</span> to <span className="italic family-supertitle">user</span>.</>} />
      <MainContent constrained={false}>
        <AboutMeSection />
        <ServiceSection />
        <TechnologySection />
        <WorksSection works={ new_works } />
        <CTASection />
      </MainContent>
    </DefaultLayout>
  );
};

export default HomePage;
