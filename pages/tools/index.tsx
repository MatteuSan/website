import React, { useState } from 'react';
import { NextPage } from 'next';
import { DefaultLayout, MainContent } from '@/layouts/DefaultLayout';
import { MSHero, MSInfoCard } from '@/components';

import { tools } from '@/constants/tools';
import { useRouter } from "next/router";

const itemsWithSlug = tools.filter((item) => item?.slug != null);
const itemsWithoutSlug = tools.filter((item) => item?.slug == null);

const cleanedItems = itemsWithSlug.concat(itemsWithoutSlug);

const validToolTags = ['Design System', 'Library', 'Open Source'];

const ToolsPage: NextPage = () => {
  const toolsSectionRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [filter, setFilter] = useState<string>(router.query?.filter ? router.query?.filter.toString() : 'all');
  const filteredItems = filter !== 'all' ? cleanedItems.filter((item) => item?.tags.includes(filter ?? '')) : cleanedItems;

  const handleFilter = (event: any, targetFilter?: string) => {
    setFilter(event.target.value ?? targetFilter);
  }

  return (
    <DefaultLayout title="TOOLS" description="Empowering teams (and you!) to build better experiences." hasHero>
      <MSHero customLayout>
        <div className="constrained w-full flex flow-column gap-lg @large:gap-xl jc-center ai-center">
          <div>
            <h2 className="lead-text family-supertitle size-4xl letter-spacing-condensed align-center">Tools</h2>
            <p className="content mt-sm size-md @large:size-lg weight-light align-center">Empowering teams (and you!) to build better experiences.</p>
            <p className="content-2 mt-md size-sm de-emphasize align-center">
              I created these tools to help me build better software. From internal component libraries to custom workflows and documentation systems, each one reflects my philosophy of building with care, clarity, and long-term scalability in mind.
            </p>
          </div>
          {/*<div id="cta" className="content-3 flex flow-row wrap-none jc-center ai-center gap-md @medium:gap-lg">
            <MSButton data-cal-link="matteu" data-cal-config='{"theme":"dark"}' type="filled large">Book a call</MSButton>
          </div>*/}
        </div>
      </MSHero>
      <MainContent className="h-half-screen">
        <section className="flex flow-row wrap-none jc-space-between ai-center gap-sm">
          <h3 className="subtitle">
            { filteredItems.length != 0 ? `Found ${ filteredItems.length } ${ filteredItems.length >= 2 ? 'items' : 'item' }.` : (
              <span style={ { color: 'rgba(0,0,0,0)' } } aria-hidden="true">Hidden text</span>) }
          </h3>
          <label className="ms-select-field" style={ { maxWidth: 'max-content' } }>
            <select className="ms-select-field__input" name="tags" defaultValue={filter} onChange={ handleFilter }>
              <option value="all">Filter</option>
              { validToolTags.map((tag, key) => (
                <option key={ key } value={ tag }>{ tag }</option>
              )) }
            </select>
          </label>
        </section>
        <section className="mb-4xl" ref={toolsSectionRef}>
          <div className="grid cols-1 @medium:cols-2 {/*@large:cols-3*/} gap-lg" id="projects">
            <>
              { filteredItems.length != 0 ? filteredItems.map((item: any, key: any) => {
                return (
                  <MSInfoCard key={ key } index={ key } item={ item } linkBase="tools"/>
                );
              }) : (
                <div className="grid pi-center p-2xl border-xs start-1 end-3">
                  <p className="subtitle">No items found.</p>
                </div>
              ) }
            </>
          </div>
        </section>
      </MainContent>
    </DefaultLayout>
  );
};

export default ToolsPage;