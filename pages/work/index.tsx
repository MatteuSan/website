import React, { useState } from 'react';
import { NextPage } from 'next';
import { DefaultLayout, MainContent } from '@/layouts/DefaultLayout';
import {
  MSButton, MSHero, MSInfoCard
} from '@/components';

import { works } from '@/constants/works';
import { useRouter } from "next/router";
import Image from 'next/image';

const itemsWithSlug = works.filter((item) => item?.slug != null);
const itemsWithoutSlug = works.filter((item) => item?.slug == null);

let cleanedItems = itemsWithSlug.concat(itemsWithoutSlug);

const validWorkTags = ['Design', 'Development', 'Open Source', 'Website', 'Web App'];

const WorkPage: NextPage = () => {
  const workSectionRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [filter, setFilter] = useState<string>(router.query?.filter ? router.query?.filter.toString() : 'all');
  const filteredItems = filter !== 'all' ? cleanedItems.filter((item) => item?.tags.includes(filter ?? '')) : cleanedItems;

  const handleFilter = (event: any, targetFilter?: string) => {
    setFilter(event.target.value ?? targetFilter);
  }

  return (
    <DefaultLayout title="WORK" description="Projects that ushered companies to their success." hasHero>
      <MSHero customLayout>
        <div className="constrained w-full flex flow-column gap-lg @large:gap-xl jc-center ai-center">
          <div>
            <h2 className="lead-text family-supertitle size-4xl letter-spacing-condensed align-center">Works</h2>
            <p className="content mt-sm size-md @large:size-lg weight-light align-center">Projects that ushered companies to their success.</p>
            <p className="content-2 mt-md size-sm de-emphasize align-center">
              Browse the works that companies invested in to expand their online presence and drive business growth.
            </p>
          </div>
          {/*<div id="cta" className="content-3 flex flow-row wrap-none jc-center ai-center gap-md @medium:gap-lg">
            <MSButton data-cal-link="matteu" data-cal-config='{"theme":"dark"}' type="filled large">Book a call</MSButton>
          </div>*/}
        </div>
      </MSHero>
      <MainContent>
        <section className="flex flow-row wrap-none jc-space-between ai-center gap-sm">
          <h3 className="subtitle">
            { filteredItems.length != 0 ? `Found ${ filteredItems.length } ${ filteredItems.length >= 2 ? 'items' : 'item' }.` : (
              <span style={ { color: 'rgba(0,0,0,0)' } } aria-hidden="true">Hidden text</span>) }
          </h3>
          <label className="ms-select-field" style={ { maxWidth: 'max-content' } }>
            <select className="ms-select-field__input" name="tags" defaultValue={filter} onChange={ handleFilter }>
              <option value="all">Filter</option>
              { validWorkTags.map((tag, key) => (
                <option key={ key } value={ tag }>{ tag }</option>
              )) }
            </select>
          </label>
        </section>
        <section className="content-section mb-4xl" ref={workSectionRef}>
          <section className="grid cols-1 @medium:cols-2 {/*@large:cols-3*/} gap-lg"
                             id="projects">
            { filteredItems.length != 0 ? filteredItems.map((item: any, key: number) => {
                return (
                  <MSInfoCard key={ key } index={ key } item={ item } linkBase="work"/>
                );
              }) :
              (
                <div className="grid pi-center p-2xl border-xs start-1 end-3">
                  <p className="subtitle">No items found.</p>
                </div>
              )
            }
          </section>
        </section>
      </MainContent>
    </DefaultLayout>
  );
};

export default WorkPage;