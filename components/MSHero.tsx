import React from 'react';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { animateInView, MOTION_PREFERENCES, useMediaQuery } from "@/lib/gsap";

interface MSHeroProps {
  children?: React.ReactNode|string;
}

const MSHero: React.FC<MSHeroProps> = ({ children }) => {
  const heroRef = React.useRef<HTMLDivElement>(null);
  const isMotionReduced = useMediaQuery(MOTION_PREFERENCES.isReduced);

  useGSAP(() => {
    gsap.registerPlugin(useGSAP, ScrollTrigger);

    const exit = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top 7%',
        scrub: true,
      }
    });

    animateInView(heroRef.current).from(heroRef.current, {
      opacity: 0,
      y: !isMotionReduced ? 70 : 0,
      duration: 1
    });

    exit.to(heroRef.current, {
      opacity: 0,
      y: -100,
      ease: 'power2',
    });
  }, { scope: heroRef });

  return (
    <section className="ms-hero constrained-layout my-5xl @large:my-6xl r-xl py-4xl @large:py-5xl" ref={heroRef}>
      { children }
    </section>
  );
};

export default MSHero;