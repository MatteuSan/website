import React, { useState } from 'react';
import type { NextPage } from 'next';
import Image from "next/image";
import DefaultLayout from '../layouts/DefaultLayout';

import {
  MSAnimatedSection,
  MSButton,
  MSCard,
  MSCardContent,
  MSCardFooter,
  MSCardHeader, MSInfoCard,
  MSTitleBar
} from '../components';

import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiSass,
  SiTypescript,
  SiPhp,
  SiReact,
  SiVuedotjs,
  SiLaravel,
  SiTailwindcss,
  SiGit,
  SiGithub, SiLinkedin
} from '@icons-pack/react-simple-icons';
import {
  ArrowRightIcon,
  BriefcaseIcon,
  CodeBracketSquareIcon, EnvelopeIcon,
  InformationCircleIcon, PhoneIcon, StarIcon, WrenchScrewdriverIcon
} from "@heroicons/react/24/outline";

import { tools } from '../constants/tools';
import { works } from '../constants/works';
import Technology from "../components/Technology";

const workItemsWithSlug = works.filter((item) => item?.slug != null);
const workItemsWithoutSlug = works.filter((item) => item?.slug == null);
const workCleanedItems = workItemsWithSlug.concat(workItemsWithoutSlug);

const toolsItemsWithSlug = tools.filter((item) => item?.slug != null);
const toolsItemsWithoutSlug = tools.filter((item) => item?.slug == null);
const toolsCleanedItems = toolsItemsWithSlug.concat(toolsItemsWithoutSlug);

const new_works = workCleanedItems.slice(0, 4);
const new_tools = toolsCleanedItems.slice(0, 4);

const HomePage: NextPage = () => {
  const [cardCount, setCardCount] = useState(1)

  return (
    <DefaultLayout title="HOME" heroTitle="MatteuSan"
                   heroSubtitle="UX Engineer. Creating bridges from software to user."
                   heroAction={ <MSButton type="filled large inverted" link="#about-me">Get to know me</MSButton> } hasHero>

      <MSAnimatedSection id="about-me" className="grid cols-1 my-2xl gap-2xl start-1 end-4 @large:cols-3 @large:mt-xl @large:mb-6xl @large:start-1 @large:end-8">
        <div className="flex flow-column jc-center start-1 end-1 @large:end-2">
          <MSTitleBar icon={ <InformationCircleIcon /> }>About me</MSTitleBar>
          {/* eslint-disable-next-line react/no-unescaped-entities */ }
          <p className="mt-sm">
            I'm a UX Engineer based in the Philippines, and I build bridges from software to user. I create <span
            className="highlight">beautiful</span> and <span className="highlight">intuitive interfaces</span> for the web, making it <span
            className="highlight">accessible</span> to all and curating <span className="highlight">delightful experiences</span>.
          </p>
        </div>
        <div className="picture-frame start-1 end-1 @large:start-3 @large:end-3">
          <Image src="/img/matt-headshot.webp" alt="Matteu Headshot" width={ 3000 } height={ 2000 }/>
        </div>
      </MSAnimatedSection>

      <MSAnimatedSection id="skills-and-technologies" className="grid cols-1 my-6xl gap-2xl start-1 end-4 @large:cols-3 @large:mt-xl @large:mb-6xl @large:start-1 @large:end-8">
        <MSAnimatedSection delay={0.4} id="technologies" className="start-1 end-1 @large:start-1 @large:end-1" aria-hidden="true">
          <Technology icon={ <SiHtml5/> } label="HTML" color="#E44D26"/>
          <Technology icon={ <SiCss3/> } label="CSS" color="#2965F1"/>
          <Technology icon={ <SiJavascript/> } label="JavaScript" color="#F7DF1E"/>
          <Technology icon={ <SiSass/> } label="SCSS" color="#CD6799"/>
          <Technology icon={ <SiTypescript/> } label="TypeScript" color="#3178C6"/>
          <Technology icon={ <SiPhp/> } label="PHP" color="#8892BF"/>
          <Technology icon={ <SiReact/> } label="React" color="#61DAFB"/>
          <Technology icon={ <SiVuedotjs/> } label="Vue.js" color="#4FC08D"/>
          <Technology icon={ <SiLaravel/> } label="Laravel" color="#FF2D20"/>
          <Technology icon={ <SiTailwindcss/> } label="Tailwind CSS" color="#38B2AC"/>
          <Technology icon={ <SiGit/> } label="Git" color="#F05032"/>
          <Technology icon={ <SiGithub/> } label="GitHub" color="#fff"/>
        </MSAnimatedSection>
        <div className="flex flow-column jc-center start-1 end-1 @large:start-2 @large:end-3">
          <MSTitleBar icon={ <CodeBracketSquareIcon/> }>Skills & Technology</MSTitleBar>
          <p className="mb-lg mt-sm">Aside from my fluency in UI/UX design and development, my expertise extends
            to <span
              className="highlight">project management</span>, collaboration, and the development and management
            of <span
              className="highlight">design systems</span> and even in <span
              className="highlight">open-source software</span>. </p>
        </div>
      </MSAnimatedSection>

      <MSAnimatedSection id="stuff-i-do" className="start-1 end-4 mb-2xl @large:end-12 @large:mb-6xl">
        <MSTitleBar icon={<BriefcaseIcon />}>Stuff I do</MSTitleBar>
        <p className="mt-sm mb-md">Here are a few of the things I can do...</p>
        <div className="grid cols-1 @medium:cols-2 gap-lg mt-lg" style={ { maxWidth: '877px' } }>
          <ul className="services-list">
            <li
              className={ `services-list__item family-title size-xl weight-body${ cardCount == 1 ? ' is-active' : '' }` }
              onClick={ () => setCardCount(1) }>Web Apps
            </li>
            <li
              className={ `services-list__item family-title size-xl weight-body${ cardCount == 2 ? ' is-active' : '' }` }
              onClick={ () => setCardCount(2) }>Websites
            </li>
            <li
              className={ `services-list__item family-title size-xl weight-body${ cardCount == 3 ? ' is-active' : '' }` }
              onClick={ () => setCardCount(3) }>Design Systems
            </li>
            <li
              className={ `services-list__item family-title size-xl weight-body${ cardCount == 4 ? ' is-active' : '' }` }
              onClick={ () => setCardCount(4) }>Open Source
            </li>
          </ul>
          <MSCard style={ cardCount == 1 ? {} : { display: 'none' } } delay={ 0.4 }>
            <MSCardHeader title="Web Apps" />
            <MSCardContent>
              I design and develop intuitive interfaces and create delightful experiences for software products hosted on the web.
            </MSCardContent>
            <MSCardFooter>
              <MSButton type="filled" link="/work">See examples</MSButton>
            </MSCardFooter>
          </MSCard>
          <MSCard style={ cardCount == 2 ? {} : { display: 'none' } } delay={ 0.4 }>
            <MSCardHeader title="Websites" />
            <MSCardContent>
              Sort of the same thing I do for web apps... but this time for content-driven websites!
            </MSCardContent>
            <MSCardFooter>
              <MSButton type="filled" link="/work">See examples</MSButton>
            </MSCardFooter>
          </MSCard>
          <MSCard style={ cardCount == 3 ? {} : { display: 'none' } } delay={ 0.4 }>
            <MSCardHeader title="Design Systems" />
            <MSCardContent>
              I build custom tools that govern interfaces from design to development across an ecosystem of products to unify experiences, and increase designer and developer productivity.
            </MSCardContent>
            <MSCardFooter>
              <MSButton type="filled" link="/tools">See examples</MSButton>
            </MSCardFooter>
          </MSCard>
          <MSCard style={ cardCount == 4 ? {} : { display: 'none' } } delay={ 0.4 }>
            <MSCardHeader title="Open Source" />
            <MSCardContent>
              I absolutely love doing open source projects! I open source most of my concept projects and also the tools that I use on an everyday basis.
            </MSCardContent>
            <MSCardFooter>
              <MSButton type="filled" link="/tools">See examples</MSButton>
            </MSCardFooter>
          </MSCard>
        </div>
      </MSAnimatedSection>

      <MSAnimatedSection className="content-section @large:start-1 @large:end-4 start-1 end-12">
        <MSTitleBar icon={ <StarIcon/> }>Featured works</MSTitleBar>
        <div className="ms-carousel mt-md" id="projects">
          { new_works.map((item, key) => {
            return (
              <MSInfoCard key={ key } reference={ key } item={ item } linkBase="work"/>
            );
          }) }
          <MSButton link="/work" type="outlined full-width" icon={ ['right', <ArrowRightIcon/>] }>See all works</MSButton>
        </div>
      </MSAnimatedSection>

      <MSAnimatedSection className="content-section @large:start-1 @large:end-4 start-1 end-12">
        <MSTitleBar icon={<WrenchScrewdriverIcon />}>Featured tools</MSTitleBar>
        <div className="ms-carousel mt-md" id="tools">
          { new_tools.map((item, key) => {
            return (
              <MSInfoCard key={ key } reference={ key } item={ item } linkBase="tools"/>
            );
          }) }
          <MSButton link="/tools" type="outlined full-width" icon={ ['right', <ArrowRightIcon/>] }>See all tools</MSButton>
        </div>
      </MSAnimatedSection>

      <MSAnimatedSection className="grid pi-center @large:mt-3xl @large:mb-6xl">
        <MSAnimatedSection delay={0.4} id="ready-to-collaborate">
          <MSTitleBar typePreset="subtitle family-supertitle" icon={<PhoneIcon />}>Ready to make the leap?</MSTitleBar>
          <p style={ { margin: '1rem 0' } }>I'd be delighted to work on your project! Just click any of the contact buttons below and we'll keep in touch :)</p>
          <div className="flex flow-row gap-md jc-center mt-lg">
            <MSButton type="filled" icon={ ['left', <EnvelopeIcon />] } link="mailto:matt@matteusan.com"
                      isDisabled>Email</MSButton>
            <MSButton type="filled" icon={ ['left', <SiLinkedin />] } link="/linkedin" isDisabled>LinkedIn</MSButton>
          </div>
        </MSAnimatedSection>
      </MSAnimatedSection>
    </DefaultLayout>
  );
};

export default HomePage;
