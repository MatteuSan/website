import React from 'react';
import type { NextPage } from 'next';
import { DefaultLayout, MainContent } from '@/layouts/DefaultLayout';

import {
  MSButton,
  MSHero,
  MSTitleBar
} from '@/components';

import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { SiLinkerd } from "@icons-pack/react-simple-icons";

import { works } from '@/constants/works';

import ServiceSection from "@/components/pages/home/ServiceSection";
import TechnologySection from "@/components/pages/home/TechnologySection";
import AboutMeSection from "@/components/pages/home/AboutMeSection";
import WorksSection from "@/components/pages/home/WorksSection";

const workItemsWithSlug = works.filter((item) => item?.slug != null);
const workItemsWithoutSlug = works.filter((item) => item?.slug == null);
const workCleanedItems = workItemsWithSlug.concat(workItemsWithoutSlug);

const new_works = workCleanedItems.slice(0, 5);

const HomePage: NextPage = () => {
  return (
    <DefaultLayout title="HOME" hasHero>
      <MSHero title="MatteuSan" subtitle={<span>Creating bridges from <span className="italic family-supertitle">software</span> to <span className="italic family-supertitle">user</span>.</span>} action={ <MSButton type="filled large inverted" link="#about-me">Get to know me</MSButton> } />
      <AboutMeSection />
      <ServiceSection />
      <TechnologySection />
      <MainContent>
        <WorksSection works={ new_works } />
        <section className="grid pi-center my-4xl @large:my-6xl">
          <section id="ready-to-collaborate">
            <MSTitleBar typePreset="title">Ready to make the leap?</MSTitleBar>
            <p style={ { margin: '1rem 0' } }>I'd be delighted to work on your project! Just click any of the contact buttons below and we'll keep in touch :)</p>
            <div className="flex flow-row gap-md jc-center mt-lg">
              <MSButton type="filled" icon={ ['left', <EnvelopeIcon />] } link="mailto:matt@matteusan.com"
                        isDisabled>Email</MSButton>
              <MSButton type="filled" icon={ ['left', <SiLinkerd />] } link="/linkedin" isDisabled>LinkedIn</MSButton>
            </div>
          </section>
        </section>
      </MainContent>
    </DefaultLayout>
  );
};

export default HomePage;
