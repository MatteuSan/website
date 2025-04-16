import React, { useRef } from 'react';
import TechnologyChip from "@/components/pages/home/TechnologyChip";
import {
  SiCss3, SiGit, SiGithub,
  SiHtml5,
  SiJavascript, SiLaravel, SiMysql, SiNodedotjs,
  SiPhp, SiPostgresql,
  SiReact,
  SiSass, SiSqlite, SiSvelte, SiTailwindcss, SiThreedotjs,
  SiTypescript,
  SiVuedotjs
} from "@icons-pack/react-simple-icons";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { TextPlugin } from "gsap/dist/TextPlugin";

gsap.registerPlugin(useGSAP, ScrollTrigger, TextPlugin);

const TechnologySection: React.FC = () => {
  const technologySectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const contentTl = gsap.timeline({
      scrollTrigger: {
        trigger: technologySectionRef.current,
        start: 'top 0%',
        end: 'bottom 0%',
        scrub: true,
        pin: true,
        toggleActions: 'play pause resume reset',
        pinType: 'fixed',
      }
    });

    const initialState = () => {
      gsap.set(technologySectionRef.current, {
        opacity: 0,
        y: 30
      });

      const CONTENT_CLASSES = [
        '.content-1',
        '.content-2',
        '.content-3',
        '.content-4',
        '.content-5',
        '.content-6'
      ];

      CONTENT_CLASSES.forEach((content: string) => {
        gsap.set(content, {
          opacity: 0,
          y: 30,
        });
      });

      gsap.set('#technologies .technology', { y: -50, opacity: 0 });
    }

    const enterAnimation = () => {
      gsap.to(technologySectionRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.lead-text',
          start: 'top 90%',
          scrub: true,
          toggleActions: 'play pause resume reset',
        }
      });
      contentTl.to('.content-1', {
        opacity: 1,
        y: 0,
        duration: 3,
      });
      contentTl.to('#technologies', {
        opacity: 1,
        y: 0,
        duration: 3,
      }, '<');

      const technologyTiles = gsap.utils.toArray('#technologies .technology');

      technologyTiles.forEach((tile: any) => {
        contentTl.to(tile, { y: 0, opacity: 1, duration: 0.2, ease: 'elastic',
          stagger: {
            amount: 0.05,
          }
        });
      });

      contentTl.to('.content-2', {
        opacity: 1,
        y: 0,
        duration: 3,
      });

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

      const filteredUnmasteredTechnologyTiles = technologyTiles.filter((tile: any) => !MASTERED_TECHNOLOGIES.includes(tile.id));
      const filteredMasteredTechnologyTiles = technologyTiles.filter((tile: any) => MASTERED_TECHNOLOGIES.includes(tile.id));

      filteredUnmasteredTechnologyTiles.forEach((tile: any, key: number) => {
        if (key >= 1) {
          contentTl.to(tile, INACTIVE_CLASS);
        } else {
          contentTl.to(tile, INACTIVE_CLASS, '-=1');
        }
      });

      contentTl.to('.content-3', {
        opacity: 1,
        y: 0,
        duration: 3,
      });

      filteredMasteredTechnologyTiles.forEach((tile: any, key: number) => {
        if (key >= 1) {
          contentTl.to(tile, ACTIVE_CLASS);
        } else {
          contentTl.to(tile, ACTIVE_CLASS, '-=1');
        }
      });

      contentTl.to('.content-4', {
        opacity: 1,
        y: 0,
        duration: 3,
      });

      contentTl.to('.content-5', {
        opacity: 1,
        y: 0,
        duration: 3,
      });

      contentTl.to('.content-6', {
        opacity: 1,
        y: 0,
        duration: 3,
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
      className="w-full h-screen flex flow-column jc-start pt-4xl pb-3xl fill-surface-600"
      ref={technologySectionRef}
    >
      <div className="constrained flex flow-column jc-center">
        <h2 className="lead-text family-supertitle size-3xl @medium:size-4xl">Stuff I use</h2>
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
        {/*<TechnologyChip icon={ <SiNextdotjs/> } label="Next.js" color="#000"/>
        <TechnologyChip icon={ <SiNuxt/> } label="Nuxt" color="#00DC82"/>*/}
        <TechnologyChip icon={ <SiSass/> } label="SCSS" color="#CD6799"/>
        <TechnologyChip icon={ <SiTailwindcss/> } label="Tailwind CSS" color="#38B2AC"/>
        <TechnologyChip icon={ <SiPostgresql/> } label="PostgreSQL" color="#4169E1"/>
        <TechnologyChip icon={ <SiMysql/> } label="MySQL" color="#4479A1"/>
        <TechnologyChip icon={ <SiSqlite/> } label="SQLite" color="#003B57"/>
        <TechnologyChip icon={ <SiGithub/> } label="GitHub" color="#fff"/>
        <TechnologyChip icon={ <SiGit/> } label="Git" color="#F05032"/>
      </div>
      <div className="constrained flex flow-column jc-center mt-2xl">
        <p className="content family-subtitle size-md weight-light">
          <span className="content-5 block my-sm">Delivering you the <span className="highlight">best</span> results.</span>
          <span className="content-6 block">And giving your users the <span className="highlight">experience they deserve</span>.</span>
        </p>
      </div>
    </section>
  );
};

export default TechnologySection;