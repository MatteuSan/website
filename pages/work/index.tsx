import React, { useState } from 'react';
import { NextPage } from 'next';
import { DefaultLayout, MainContent } from '@/layouts/DefaultLayout';
import { MSHero, MSInfoCard
} from '@/components';

import { works } from '@/constants/works';
import { useRouter } from "next/router";
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/dist/SplitText';
import {
  animateInView,
  BY_CHAR,
  BY_LINE, MOTION_PREFERENCES,
  REDUCED_TEXT_MASK_ANIMATION,
  TEXT_MASK_ANIMATION,
  useMediaQuery
} from '@/lib/gsap';

const itemsWithSlug = works.filter((item) => item?.slug != null);
const itemsWithoutSlug = works.filter((item) => item?.slug == null);

let cleanedItems = itemsWithSlug.concat(itemsWithoutSlug);

const validWorkTags = ['Design', 'Development', 'Open Source', 'Website', 'Web App'];

const WorkPage: NextPage = () => {
  const workSectionRef = React.useRef<HTMLDivElement>(null);
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

    const work = animateInView(workSectionRef.current, {
      once: true,
    });

    work.from(workSectionRef.current, {
      opacity: 0,
      y: !isMotionReduced ? 70 : 0,
      duration: 1
    });

    work.from(titleSplit.chars, {
      ...(!isMotionReduced ? TEXT_MASK_ANIMATION : REDUCED_TEXT_MASK_ANIMATION),
      onComplete: () => titleSplit.revert()
    }, '-=0.5');

    work.fromTo('.picture-frame', {
      opacity: 0,
      duration: 0.5,
    }, {
      opacity: 1,
      y: 0,
    }, '<');

    work.from(subtitleSplit.lines, {
      ...(!isMotionReduced ? TEXT_MASK_ANIMATION : REDUCED_TEXT_MASK_ANIMATION),
      stagger: 0.1,
      onComplete: () => subtitleSplit.revert()
    }, '-=0.5');

    work.from('.content-2', {
      opacity: 0,
      y: !isMotionReduced ? 30 : 0,
      duration: 0.5,
    }, '-=0.5');

    work.from('.content-3', {
      opacity: 0,
      y: !isMotionReduced ? 30 : 0,
      duration: 0.5,
    }, '<50%');
  });

  return (
    <DefaultLayout title="WORK" description="Projects that ushered companies to their success." hasHero>
      <MSHero ref={workSectionRef}>
        <div>
          <h2 className="lead-text family-supertitle size-4xl letter-spacing-condensed align-center">Works</h2>
          <p className="content size-md @large:size-lg weight-light align-center">Projects that ushered companies to their success.</p>
        </div>
        <p className="content-2 mt-md size-sm de-emphasize align-center">
          Browse the works that companies invested in to expand their online presence and drive business growth.
        </p>
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
        <section className="content-section mb-4xl">
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