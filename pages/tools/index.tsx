import React, { useState } from 'react';
import { NextPage } from 'next';
import { DefaultLayout, MainContent } from '../../layouts/DefaultLayout';
import { MSHero, MSInfoCard } from '../../components';

import { tools } from '../../constants/tools';
import { useRouter } from "next/router";

const itemsWithSlug = tools.filter((item) => item?.slug != null);
const itemsWithoutSlug = tools.filter((item) => item?.slug == null);

const cleanedItems = itemsWithSlug.concat(itemsWithoutSlug);

const validToolTags = ['Design System', 'Library', 'Open Source'];

const ToolsPage: NextPage = () => {
  const [filter, setFilter] = useState('all')
  const filteredItems = filter !== 'all' ? cleanedItems.filter((item) => item?.tags.includes(filter ?? '')) : cleanedItems;

  const handleFilter = (event: any, targetFilter?: string) => {
    // console.log(event.target.value ?? targetFilter);
    setFilter(event.target.value ?? targetFilter);
  }

  return (
    <DefaultLayout title="TOOLS" heroTitle="Tools"
                   heroSubtitle="Empowering teams (and you!) to build better user experiences." hasHero>
      <section className="flex flow-row wrap-none jc-space-between ai-center gap-sm">
        <h3 className="subtitle">
          { filteredItems.length != 0 ? `Found ${ filteredItems.length } ${ filteredItems.length >= 2 ? 'items' : 'item' }.` : (
            <span style={ { color: 'rgba(0,0,0,0)' } } aria-hidden="true">Hidden text</span>) }
        </h3>
        <label className="ms-select-field" style={ { maxWidth: 'max-content' } }>
          <select className="ms-select-field__input" name="tags" onChange={ handleFilter }>
            <option value="all">Filter</option>
            { validToolTags.map((tag, key) => (
              <option key={ key } value={ tag }>{ tag }</option>
            )) }
          </select>
        </label>
      </section>
      <section className="content-section">
        <div className="grid cols-1 @medium:cols-2 @large:cols-3 gap-lg" id="projects">
          <>
            { filteredItems.length != 0 ? filteredItems.map((item: any, key: any) => {
              return (
                <MSInfoCard key={ key } reference={ key } item={ item } linkBase="tools"/>
              );
            }) : (
              <div className="grid pi-center p-2xl border-xs start-1 end-3">
                <p className="subtitle">No items found.</p>
              </div>
            ) }
          </>
        </div>
      </section>
    <DefaultLayout title="TOOLS" description="Empowering teams (and you!) to build better user experiences." hasHero>
      <MSHero title="Tools" subtitle="Empowering teams (and you!) to build better user experiences." />
      <MainContent>
        <section className="flex flow-row wrap-none jc-space-between ai-center gap-sm">
          <h3 className="subtitle">
            { filteredItems.length != 0 ? `Found ${ filteredItems.length } ${ filteredItems.length >= 2 ? 'items' : 'item' }.` : (
              <span style={ { color: 'rgba(0,0,0,0)' } } aria-hidden="true">Hidden text</span>) }
          </h3>
          <label className="ms-select-field" style={ { maxWidth: 'max-content' } }>
              <option value="all">Filter</option>
              { validToolTags.map((tag, key) => (
                <option key={ key } value={ tag }>{ tag }</option>
              )) }
            </select>
          </label>
        </section>
        <section className="content-section">
          <div className="grid cols-1 @medium:cols-2 @large:cols-3 gap-lg" id="projects">
            <>
              { filteredItems.length != 0 ? filteredItems.map((item: any, key: any) => {
                return (
                  <MSInfoCard key={ key } reference={ key } item={ item } linkBase="tools"/>
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