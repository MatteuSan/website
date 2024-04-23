import React, { useState } from 'react';
import { NextPage } from 'next';
import { DefaultLayout, MainContent } from '../../layouts/DefaultLayout';
import {
  MSAnimatedSection, MSHero, MSInfoCard
} from '../../components';

import { works } from '../../constants/works';
import { useRouter } from "next/router";

const itemsWithSlug = works.filter((item) => item?.slug != null);
const itemsWithoutSlug = works.filter((item) => item?.slug == null);

let cleanedItems = itemsWithSlug.concat(itemsWithoutSlug);

const validWorkTags = ['Open Source', 'Website', 'Web App'];

const WorkPage: NextPage = () => {
  const [filter, setFilter] = useState('all')
  const filteredItems = filter !== 'all' ? cleanedItems.filter((item) => item?.tags.includes(filter ?? '')) : cleanedItems;

  const handleFilter = (event: any, targetFilter?: string) => {
    // console.log(event.target.value ?? targetFilter);
    setFilter(event.target.value ?? targetFilter);
  }

  return (
    <DefaultLayout title="WORK" heroTitle="Works" heroSubtitle="Projects made for clients, and for myself :)" hasHero>
      <section className="flex flow-row wrap-none jc-space-between ai-center gap-sm">
        <h3 className="subtitle">
          { filteredItems.length != 0 ? `Found ${ filteredItems.length } ${ filteredItems.length >= 2 ? 'items' : 'item' }.` : (<span style={{ color: 'rgba(0,0,0,0)' }} aria-hidden="true">Hidden text</span>) }
        </h3>
        <label className="ms-select-field" style={{ maxWidth: 'max-content' }}>
          <select className="ms-select-field__input" name="tags" onChange={ handleFilter }>
            <option value="all">Filter</option>
            { validWorkTags.map((tag, key) => (
              <option key={ key } value={ tag }>{ tag }</option>
            )) }
          </select>
        </label>
      </section>
      <section className="content-section">
        <MSAnimatedSection delay={ 0 } stagger={ 0.2 } className="grid cols-1 @medium:cols-2 @large:cols-3 gap-lg" id="projects">
          { filteredItems.length != 0 ? filteredItems.map((item: any, key: number) => {
            return (
              <MSInfoCard key={ key } reference={ key } item={ item } linkBase="work"/>
            );
          }) :
            (
              <div className="grid pi-center p-2xl border-xs start-1 end-3">
                <p className="subtitle">No items found.</p>
              </div>
            )
          }
        </MSAnimatedSection>
      </section>
    <DefaultLayout title="WORK" description="Projects made for clients, and for myself :)" hasHero>
      <MSHero title="Works" subtitle="Projects made for clients, and for myself :)" />
      <MainContent>
        <section className="flex flow-row wrap-none jc-space-between ai-center gap-sm">
          <h3 className="subtitle">
            { filteredItems.length != 0 ? `Found ${ filteredItems.length } ${ filteredItems.length >= 2 ? 'items' : 'item' }.` : (
              <span style={ { color: 'rgba(0,0,0,0)' } } aria-hidden="true">Hidden text</span>) }
          </h3>
          <label className="ms-select-field" style={ { maxWidth: 'max-content' } }>
              <option value="all">Filter</option>
              { validWorkTags.map((tag, key) => (
                <option key={ key } value={ tag }>{ tag }</option>
              )) }
            </select>
          </label>
        </section>
        <section className="content-section">
          <MSAnimatedSection delay={ 0 } stagger={ 0.2 } className="grid cols-1 @medium:cols-2 @large:cols-3 gap-lg"
                             id="projects">
            { filteredItems.length != 0 ? filteredItems.map((item: any, key: number) => {
                return (
                  <MSInfoCard key={ key } reference={ key } item={ item } linkBase="work"/>
                );
              }) :
              (
                <div className="grid pi-center p-2xl border-xs start-1 end-3">
                  <p className="subtitle">No items found.</p>
                </div>
              )
            }
          </MSAnimatedSection>
        </section>
      </MainContent>
    </DefaultLayout>
  );
};

export default WorkPage;