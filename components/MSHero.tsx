import React from 'react';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { MOTION_PREFERENCES, parallaxExit, splitText, useMediaQuery } from "@/lib/gsap";

interface MSHeroProps {
  title: string;
  subtitle: string|React.ReactNode;
  action?: any;
}

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MSHero: React.FC<MSHeroProps> = ({ title, subtitle, action }) => {
  const heroRef = React.useRef<HTMLDivElement>(null);
  const heroWrapRef = React.useRef<HTMLDivElement>(null);

  const heroTitleRef = React.useRef<HTMLHeadingElement>(null);
  const heroDescriptionRef = React.useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const isMotionReduced = useMediaQuery(MOTION_PREFERENCES.isReduced);

    const contentTl = gsap.timeline();
    const parallaxTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: '0% top',
        scrub: true,
      }
    });

    const titleSplit = splitText(heroTitleRef.current);

    contentTl.from(
      titleSplit.identifier,
      {
        y: !isMotionReduced ? '100%' : 0,
        opacity: isMotionReduced ? 0 : 1,
        rotateX: !isMotionReduced ? -90 : 0,
        rotateZ: !isMotionReduced ? 10 : 0,
        duration: 0.5,
        stagger: 0.05
      }
    );
    contentTl.from('.family-subtitle', { y: !isMotionReduced ? 30 : 0, opacity: 0, duration: 0.5 });
    contentTl.from('.ms-hero__actions', { y: !isMotionReduced ? 10 : 0, opacity: 0, duration: 0.5, ease: 'power2' });

    contentTl.call(() => {
      contentTl.revert();
    });

    parallaxTl.to('.family-supertitle', parallaxExit(1),);
    parallaxTl.to('.family-subtitle', parallaxExit(2), '<');
    parallaxTl.to('.ms-hero__actions', parallaxExit(3), '<');
    parallaxTl.to(heroRef.current, {
      opacity: 0,
      ease: 'power2',
      duration: 3
    }, '<90%');
  }, { scope: heroRef });

  return (
    <section className="ms-hero relative" ref={heroRef}>
      <div className="ms-hero__wrap" ref={heroWrapRef}>
        <h1 className="family-supertitle size-6xl letter-spacing-condensed relative" ref={heroTitleRef}>{ title }</h1>
        <p className="family-subtitle size-lg @medium:size-xl weight-light relative" ref={heroDescriptionRef}>{ subtitle }</p>
        { action &&
          <div className="ms-hero__actions">
            { action }
          </div>
        }
      </div>
    </section>
  );
};

export default MSHero;