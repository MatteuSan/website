import React, { useState } from 'react';
import { NextPage } from 'next';
import { DefaultLayout, MainContent } from '@/layouts/DefaultLayout';
import { MSHero, MSInfoCard } from '@/components';

import { tools } from '@/constants/tools';
import { useRouter } from "next/router";
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/dist/SplitText';
import {
  animateInView,
  BY_CHAR,
  BY_LINE, MOTION_PREFERENCES,
  REDUCED_ANIMATION,
  SWOOP_IN_ANIMATION,
  useMediaQuery
} from '@/lib/gsap';

const itemsWithSlug = tools.filter((item) => item?.slug != null);
const itemsWithoutSlug = tools.filter((item) => item?.slug == null);

const cleanedItems = itemsWithSlug.concat(itemsWithoutSlug);

const validToolTags = ['Library', 'Design System', 'Open Source'];

const ToolsPage: NextPage = () => {
  const toolsSectionRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [filter, setFilter] = useState<string>(router.query?.filter ? router.query?.filter.toString() : 'all');
  const filteredItems = filter !== 'all' ? cleanedItems.filter((item) => item?.tags.includes(filter ?? '')) : cleanedItems;
  const isMotionReduced = useMediaQuery(MOTION_PREFERENCES.isReduced);

  const handleFilter = (event: any, targetFilter?: string) => {
    setFilter(event.target.value ?? targetFilter);
  }

  useGSAP(() => {
    const titleSplit = SplitText.create('.lead-text', BY_CHAR);
    const subtitleSplit = SplitText.create('.content', BY_LINE);

    const tools = animateInView(toolsSectionRef.current, {
      once: true,
    });

    tools.from(toolsSectionRef.current, {
      opacity: 0,
      y: !isMotionReduced ? 70 : 0,
      duration: 1
    });

    tools.from(titleSplit.chars, {
      ...(!isMotionReduced ? SWOOP_IN_ANIMATION : REDUCED_ANIMATION),
      onComplete: () => titleSplit.revert()
    }, '-=0.5');

    tools.fromTo('.picture-frame', {
      opacity: 0,
      duration: 0.5,
    }, {
      opacity: 1,
      y: 0,
    }, '<');

    tools.from(subtitleSplit.lines, {
      ...(!isMotionReduced ? SWOOP_IN_ANIMATION : REDUCED_ANIMATION),
      stagger: 0.1,
      onComplete: () => subtitleSplit.revert()
    }, '-=0.5');

    tools.from('.content-2', {
      opacity: 0,
      y: !isMotionReduced ? 30 : 0,
      duration: 0.5,
    }, '-=0.5');

    tools.from('.content-3', {
      opacity: 0,
      y: !isMotionReduced ? 30 : 0,
      duration: 0.5,
    }, '<50%');
  });

  return (
    <DefaultLayout title="TOOLS" description="Empowering teams (and you!) to build better experiences.">
      <section className="mt-3xl mb-3xl w-full h-quarter-screen flex flow-column jc-end" ref={toolsSectionRef}>
        <div className="w-full constrained">
          <h2 className="lead-text family-supertitle size-4xl letter-spacing-condensed">Tools</h2>
          <p className="content size-md @large:size-lg weight-light">Empowering teams (and you!) to build better experiences.</p>
          <p className="content-2 mt-md size-sm de-emphasize">
            I created these tools to help me build better software. Each one reflects my philosophy of building with care, clarity, and scalability in mind.
          </p>
        </div>
      </section>
      <MainContent>
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
        <section className="mb-4xl">
          <div className="grid cols-1 gap-lg" id="projects">
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