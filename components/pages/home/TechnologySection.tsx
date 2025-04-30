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

import { animateInView, MOTION_PREFERENCES, splitText, useMediaQuery } from '@/lib/gsap';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const TechnologySection: React.FC = () => {
  const technologySectionRef = useRef<HTMLDivElement>(null);
  const leadTextRef = useRef<HTMLHeadingElement>(null);

  const isMotionReduced = useMediaQuery(MOTION_PREFERENCES.isReduced);

  const ACTIVE_CLASS = {
    css: {
      className: 'technology is-active'
    }
  };

  const INACTIVE_CLASS = {
    css: {
      className: 'technology is-inactive'
    }
  };

  const MASTERED_TECHNOLOGIES = [
    'html',
    'css',
    'typescript',
    'php',
    'laravel',
    'react',
    'scss',
    'postgresql',
    'github',
    'git'
  ];

  useGSAP(() => {
    const technologyTiles = gsap.utils.toArray('#technologies .technology');

    const contentTl = gsap.timeline({
      scrollTrigger: {
        trigger: technologySectionRef.current,
        start: 'top 0%',
        end: 'bottom 0%',
        toggleActions: 'play pause resume reset',
      }
    });
    const leadTextSplit = splitText(leadTextRef.current);

    const initialState = () => {
      //
    }

    const enterAnimation = () => {
      animateInView('.lead-text').from(technologySectionRef.current, {
        opacity: 0,
        y: !isMotionReduced ? 50 : 0,
        scale: 0.9,
        transformOrigin: 'bottom',
        duration: 1,
      });

      animateInView('.lead-text').from(leadTextSplit.identifier, {
        y: !isMotionReduced ? '100%' : 0,
        rotateX: !isMotionReduced ? -90 : 0,
        rotateZ: !isMotionReduced ? 10 : 0,
        stagger: 0.05
      });
    }

    const exitAnimation = () => {
      // Exit animations
    }

    initialState();
    enterAnimation();
    exitAnimation();
  }, { scope: technologySectionRef });


  return (
    <section
      id="skills-and-technologies"
      className="w-full h-screen py-4xl flex flow-column jc-center ai-center"
      ref={technologySectionRef}
    >
      <div id="skills-and-technologies__wrapper" className="flex flow-column jc-start py-2xl @medium:py-4xl fill-surface-600">
        <div className="constrained flex flow-column jc-center">
          <h2 ref={leadTextRef} className="lead-text family-supertitle size-3xl @medium:size-4xl letter-spacing-condensed">Stuff I use</h2>
          <p className="content mt-sm mb-2xl size-md weight-light">
            <span className="content-1 block">I like working with tools that conform to my philosophies of building <span className="highlight">great</span> software.</span>
            <span className="content-2 block my-sm"><span className="highlight">Constantly</span> expanding my repertoire.</span>
            <span className="content-3 block">While improving on what I'm <span className="highlight">really good</span> at.</span>
          </p>
        </div>
        <div id="technologies" className="constrained" aria-hidden="true">
          <TechnologyChip icon={ <SiHtml5/> } label="HTML" color="#E44D26"/>
          <TechnologyChip icon={ <SiCss3/> } label="CSS" color="#2965F1"/>
          <TechnologyChip icon={ <SiJavascript/> } label="JavaScript" color="#F7DF1E"/>
          <TechnologyChip icon={ <SiTypescript/> } label="TypeScript" color="#3178C6"/>
          <TechnologyChip icon={ <SiPhp/> } label="PHP" color="#8892BF"/>
          <TechnologyChip icon={ <SiLaravel/> } label="Laravel" color="#FF2D20"/>
          <TechnologyChip icon={ <SiNodedotjs/> } label="Node.js" color="#5FA04E"/>
          <TechnologyChip icon={ <SiReact/> } label="React" color="#61DAFB"/>
          <TechnologyChip icon={ <SiVuedotjs/> } label="Vue.js" color="#4FC08D"/>
          <TechnologyChip icon={ <SiSvelte/> } label="Svelte" color="#FF3E00"/>
          <TechnologyChip icon={ <SiThreedotjs/> } label="Three.js" color="#000"/>
          <TechnologyChip icon={ <SiNextdotjs/> } label="Next.js" color="#000"/>
          <TechnologyChip icon={ <SiNuxt/> } label="Nuxt" color="#00DC82"/>
          <TechnologyChip icon={ <SiSass/> } label="SCSS" color="#CD6799"/>
          <TechnologyChip icon={ <SiFigma/> } label="Figma" color="#F24E1E"/>
          <TechnologyChip icon={ <SiTailwindcss/> } label="Tailwind CSS" color="#38B2AC"/>
          <TechnologyChip icon={ <SiPostgresql/> } label="PostgreSQL" color="#4169E1"/>
          <TechnologyChip icon={ <SiMysql/> } label="MySQL" color="#4479A1"/>
          <TechnologyChip icon={ <SiSqlite/> } label="SQLite" color="#003B57"/>
          <TechnologyChip icon={ <SiGithub/> } label="GitHub" color="#fff"/>
          <TechnologyChip icon={ <SiGit/> } label="Git" color="#F05032"/>
        </div>
        <div className="constrained flex flow-column jc-center mt-2xl">
          <p className="content family-subtitle size-md weight-light">
            <span className="content-4 block my-sm">Delivering you the <span className="highlight">best</span> results.</span>
            <span className="content-5 block">And giving your users the <span className="highlight">experience they deserve</span>.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;