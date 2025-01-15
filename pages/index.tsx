import React, { useState } from 'react';
import type { NextPage } from 'next';
import Image from "next/image";
import { DefaultLayout, MainContent } from '@/layouts/DefaultLayout';

import {
  MSAnimatedSection,
  MSButton,
  MSHero,
  MSInfoCard,
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
  InformationCircleIcon, PhoneIcon, StarIcon
} from "@heroicons/react/24/outline";

import { works } from '@/constants/works';
import Technology from "@/components/Technology";

import DesignHero from '@/assets/static/design--hero.png';
import DevelopmentHero from '@/assets/static/development--hero.png';
import DesignSystemsHero from '@/assets/static/design-systems--hero.png';

const workItemsWithSlug = works.filter((item) => item?.slug != null);
const workItemsWithoutSlug = works.filter((item) => item?.slug == null);
const workCleanedItems = workItemsWithSlug.concat(workItemsWithoutSlug);

const new_works = workCleanedItems.slice(0, 5);

const HomePage: NextPage = () => {
  const [cardCount, setCardCount] = useState(1)

  return (
    <DefaultLayout title="HOME" hasHero>
      <MSHero title="MatteuSan" subtitle="UX Engineer. Creating bridges from software to user." action={ <MSButton type="filled large inverted" link="#about-me">Get to know me</MSButton> } />
      <MainContent>
        <MSAnimatedSection id="about-me" className="mt-2xl mb-xl @large:mt-4xl @large:mb-2xl flex flow-column gap-xl @medium:gap-md @medium:grid @medium:cols-2">
          <div className="flex flow-column jc-center start-1 end-1">
            <MSTitleBar icon={ <InformationCircleIcon /> }>About me</MSTitleBar>
            <p className="mt-sm">
              I'm a UX Engineer based in the Philippines, and I build bridges from software to user. I create <span
              className="highlight">beautiful</span> and <span className="highlight">intuitive interfaces</span> for the web, making it <span
              className="highlight">accessible</span> to all and curating <span className="highlight">delightful experiences</span>.
            </p>
          </div>
          <div className="picture-frame start-2 end-2">
            <Image src="/img/favicon.png" style={{ aspectRatio: '1', objectFit: 'cover' }} alt="Matteu Headshot" width={ 500 } height={ 500 }/>
          </div>
        </MSAnimatedSection>

        <MSAnimatedSection id="skills-and-technologies"
                           className="my-xl @large:my-2xl flex flow-column-reverse gap-xl @medium:gap-2xl @medium:grid @medium:cols-2">
          <MSAnimatedSection delay={ 0.4 } id="technologies" className="start-1 end-1" aria-hidden="true">
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
          <div className="flex flow-column jc-center start-2 end-2">
            <MSTitleBar icon={ <CodeBracketSquareIcon/> }>Skills & Technology</MSTitleBar>
            <p className="mb-lg mt-sm">Aside from my fluency in UI/UX design and development, my expertise extends
              to <span
                className="highlight">project management</span>, collaboration, and the development and management
              of <span
                className="highlight">design systems</span> and even in <span
                className="highlight">open-source software</span>. </p>
          </div>
        </MSAnimatedSection>

        <MSAnimatedSection id="stuff-i-do" className="my-xl @large:my-2xl start-1 end-4 @large:end-12 @large:mb-6xl">
          <MSTitleBar icon={ <BriefcaseIcon/> }>Stuff I do</MSTitleBar>
          <p className="mt-sm mb-md">Here are a few of the things I can do...</p>
          <div className="grid cols-1 gap-lg mt-lg">
            <ul className="services-list">
              <li
                className={ `services-list__item family-title size-xl weight-body${ cardCount == 1 ? ' is-active' : '' }` }
                onClick={ () => setCardCount(1) }>Design
              </li>
              <li
                className={ `services-list__item family-title size-xl weight-body${ cardCount == 2 ? ' is-active' : '' }` }
                onClick={ () => setCardCount(2) }>Development
              </li>
              <li
                className={ `services-list__item family-title size-xl weight-body${ cardCount == 3 ? ' is-active' : '' }` }
                onClick={ () => setCardCount(3) }>Design Systems
              </li>
            </ul>
            <div className="service" style={ cardCount == 1 ? {} : { display: 'none' } }>
              <Image src={ DesignHero } alt="Design Hero"/>
              <div className="service__content">
                <h4 className="title mt-md @medium:mt-4xl">Design</h4>
                <p className="body mb-md">
                  I design websites and applications with Figma that are visually appealing, and delightful to use, leaving a lasting impression on your users.
                </p>
                <MSButton type="outlined" link={ { pathname: '/work', query: { filter: 'Design' } } }>See
                  examples</MSButton>
              </div>
            </div>
            <div className="service" style={ cardCount == 2 ? {} : { display: 'none' } }>
              <Image src={ DevelopmentHero } alt="Development Hero"/>
              <div className="service__content">
                <h4 className="title mt-md @medium:mt-4xl">Development</h4>
                <p className="body mb-md">
                  I develop websites and web applications that are pleasing to look at, delightful to use, and accessible
                  to all using the most up-to-date and reliable technologies to meet your business' demanding needs.
                </p>
                <MSButton type="outlined" link={ { pathname: '/work', query: { filter: 'Development' } } }>See
                  examples</MSButton>
              </div>
            </div>
            <div className="service" style={ cardCount == 3 ? {} : { display: 'none' } }>
              <Image src={ DesignSystemsHero } alt="Design Systems Hero"/>
              <div className="service__content">
                <h4 className="title mt-md @medium:mt-4xl">Design Systems</h4>
                <p className="body mb-md">
                  I build custom tools that govern interfaces from design to development across an ecosystem of products
                  to unify experiences and increase designer and developer productivity.
                </p>
                <MSButton type="outlined" link={ { pathname: '/tools', query: { filter: 'Design System' } } }>See
                  examples</MSButton>
              </div>
            </div>
          </div>
        </MSAnimatedSection>

        <MSAnimatedSection className="content-section my-lg @large:my-xl @large:start-1 @large:end-4 start-1 end-12">
          <MSTitleBar icon={ <StarIcon/> }>Featured works</MSTitleBar>
          <div className="ms-carousel mt-md" id="projects">
            { new_works.map((item, key) => {
              return (
                <MSInfoCard key={ key } reference={ key } item={ item } linkBase="work"/>
              );
            }) }
            <MSButton link="/work" type="outlined full-width" icon={ ['right', <ArrowRightIcon/>] }>See all
              works</MSButton>
          </div>
        </MSAnimatedSection>

        <MSAnimatedSection className="grid pi-center mt-2xl mb-4xl @large:mt-4xl @large:mb-6xl">
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
      </MainContent>
    </DefaultLayout>
  );
};

export default HomePage;
