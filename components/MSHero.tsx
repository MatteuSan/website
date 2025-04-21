import React from 'react';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { MOTION_PREFERENCES, parallaxExit, useMediaQuery } from "@/lib/gsap";

interface MSHeroProps {
  title: string;
  subtitle: string|React.ReactNode;
  action?: any;
}

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MSHero: React.FC<MSHeroProps> = ({ title, subtitle, action }) => {
  const heroRef = React.useRef<HTMLDivElement>(null);
  const heroWrapRef = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const parallaxTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: '0% top',
        scrub: true,
      }
    });
    const contentTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroWrapRef.current,
        toggleActions: 'play pause resume reset',
      }
    });

    contentTl.from('.family-supertitle', { y: !useMediaQuery(MOTION_PREFERENCES.isReduced) ? 10 : 0, opacity: 0, duration: 0.5 });
    contentTl.from('.family-subtitle', { y: !useMediaQuery(MOTION_PREFERENCES.isReduced) ? 10 : 0, opacity: 0, duration: 0.5 });
    contentTl.from('.ms-hero__actions', { y: !useMediaQuery(MOTION_PREFERENCES.isReduced) ? 10 : 0, opacity: 0, duration: 0.7 });

    contentTl.call(() => {
      contentTl.revert();
    });

    parallaxTl.to('.family-supertitle', parallaxExit(1));
    parallaxTl.to('.family-subtitle', parallaxExit(2), '<');
    parallaxTl.to('.italic', parallaxExit(2, 10), '<');
    parallaxTl.to('.ms-hero__actions', parallaxExit(3), '<');
    parallaxTl.to(heroRef.current, {
      opacity: 0,
      ease: 'power2',
      duration: 3
    }, '<90%');
  }, { scope: heroRef });

  return (
    <section className="ms-hero" ref={heroRef}>
      <div className="ms-hero__wrap" ref={heroWrapRef}>
        <h1 className="family-supertitle size-6xl">{ title }</h1>
        <p className="family-subtitle size-lg @medium:size-xl weight-light">{ subtitle }</p>
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