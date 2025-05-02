import React, { useRef } from 'react';
import TechnologyChip from "@/components/pages/home/TechnologyChip";
import {
  SiCss3, SiFigma, SiGit, SiGithub,
  SiHtml5,
  SiJavascript, SiLaravel, SiMysql, SiNextdotjs, SiNodedotjs, SiNuxt,
  SiPhp, SiPostgresql,
  SiReact,
  SiSass, SiSqlite, SiSvelte, SiTailwindcss, SiThreedotjs,
  SiTypescript,
  SiVuedotjs
} from "@icons-pack/react-simple-icons";

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { SplitText } from 'gsap/dist/SplitText';

import { animateInView, BY_LINE, BY_WORD, MOTION_PREFERENCES, useMediaQuery } from '@/lib/gsap';

const TechnologySection: React.FC = () => {
  const technologySectionRef = useRef<HTMLDivElement>(null);
  const leadTextRef = useRef<HTMLHeadingElement>(null);

  const isMotionReduced = useMediaQuery(MOTION_PREFERENCES.isReduced);

  useGSAP(() => {
    const exitPage = gsap.timeline({
      scrollTrigger: {
        trigger: '#skills-and-technologies__wrapper',
        start: 'bottom 25%',
        scrub: true,
      }
    });

    const initialState = () => {
      //
    }

    const enterAnimation = () => {
      const tech = animateInView(technologySectionRef.current, {
        once: true,
      });

      const content1Split = SplitText.create('.content-1', BY_WORD);
      const content3Split = SplitText.create('.content-3', BY_LINE);

      tech.from(technologySectionRef.current, {
        opacity: 0,
        y: !isMotionReduced ? 50 : 0,
        transformOrigin: 'bottom',
        duration: 1,
      });

      tech.from(content1Split.words, {
        opacity: 0,
        y: !isMotionReduced ? '100%' : 0,
        stagger: 0.05,
        onComplete: () => {
          content1Split.revert();
        }
      });

      tech.from('.content-2', {
        opacity: 0,
        y: !isMotionReduced ? 30 : 0,
      }, '<50%');

      tech.from(content3Split.lines, {
        opacity: 0,
        y: !isMotionReduced ? '100%' : 0,
        stagger: 0.05,
        onComplete: () => {
          content3Split.revert();
        }
      }, '<50%');
    }

    const exitAnimation = () => {
      exitPage.to(technologySectionRef.current, {
        opacity: 0,
        y: !isMotionReduced ? -50 : 0,
      });
    }

    initialState();
    enterAnimation();
    exitAnimation();
    setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
  }, { scope: technologySectionRef });

  const TechnologiesMarkup = (
    <>
      <TechnologyChip icon={ <SiHtml5/> } label="HTML" color="#E44D26"/>
      <TechnologyChip icon={ <SiCss3/> } label="CSS" color="#2965F1"/>
      <TechnologyChip icon={ <SiJavascript/> } label="JavaScript" color="#F7DF1E"/>
      <TechnologyChip icon={ <SiTypescript/> } label="TypeScript" color="#3178C6"/>
      <TechnologyChip icon={ <SiPhp/> } label="PHP" color="#8892BF"/>
      <TechnologyChip icon={ <SiNodedotjs/> } label="Node.js" color="#5FA04E"/>
      <TechnologyChip icon={ <SiSass/> } label="SCSS" color="#CD6799"/>
      <TechnologyChip icon={ <SiLaravel/> } label="Laravel" color="#FF2D20"/>
      <TechnologyChip icon={ <SiTailwindcss/> } label="TailwindCSS" color="#38B2AC"/>
      <TechnologyChip icon={ <SiReact/> } label="React" color="#61DAFB"/>
      <TechnologyChip icon={ <SiVuedotjs/> } label="Vue.js" color="#4FC08D"/>
      <TechnologyChip icon={ <SiSvelte/> } label="Svelte" color="#FF3E00"/>
      <TechnologyChip icon={ <SiThreedotjs/> } label="Three.js" color="#000"/>
      <TechnologyChip icon={ <SiNextdotjs/> } label="Next.js" color="#000"/>
      <TechnologyChip icon={ <SiNuxt/> } label="Nuxt" color="#00DC82"/>
      <TechnologyChip icon={ <SiPostgresql/> } label="PostgreSQL" color="#4169E1"/>
      <TechnologyChip icon={ <SiMysql/> } label="MySQL" color="#4479A1"/>
      <TechnologyChip icon={ <SiSqlite/> } label="SQLite" color="#003B57"/>
      <TechnologyChip icon={ <SiFigma/> } label="Figma" color="#F24E1E"/>
      <TechnologyChip icon={ <SiGithub/> } label="GitHub" color="#fff"/>
      <TechnologyChip icon={ <SiGit/> } label="Git" color="#F05032"/>
    </>
  );


  return (
    <section
      id="skills-and-technologies"
      className="w-full h-screen py-4xl flex flow-column jc-center ai-center"
      ref={technologySectionRef}
    >
      <div id="skills-and-technologies__wrapper" className="flex flow-column jc-start py-2xl @medium:py-4xl">
        <div className="constrained flex flow-column jc-center">
          <h2 ref={leadTextRef} className="lead-text family-supertitle size-3xl @medium:size-4xl letter-spacing-condensed">Stuff I use</h2>
          <p className="content-1 my-sm size-md weight-light">
            I like working with tools that conform to my philosophies of building great software.
          </p>
          <p className="content-2 de-emphasize mb-2xl">
            Tools that encourage clean and scalable code, thoughtful design, and accessibility by default. I believe great software is fast, flexible, and considerate—both to the people who use it and the people who build it. That’s why I gravitate toward technologies that help me stay efficient without sacrificing quality, and stay creative without losing control...
          </p>
        </div>
        <div className="technologies" aria-hidden="true">
          { TechnologiesMarkup }
          { TechnologiesMarkup }
        </div>
        <div className="constrained flex flow-column jc-center mt-2xl">
          <p className="content-3 family-subtitle size-md weight-light">
            All in the name of delivering you the best results, and giving your users the experience they deserve.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;