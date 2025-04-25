import React, { useRef } from 'react';
import ServiceCard from "@/components/pages/home/ServiceCard";

import DesignHero from "@/assets/static/design--hero.png";
import DevelopmentHero from "@/assets/static/development--hero.png";
import DesignSystemsHero from "@/assets/static/design-systems--hero.png";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { animateInView, MOTION_PREFERENCES, splitText, useMediaQuery } from '@/lib/gsap';

const ServiceSection: React.FC = ( ) => {
  const servicesSectionRef = useRef<HTMLDivElement>(null);
  const leadTextRef = useRef<HTMLHeadingElement>(null);

  const isMotionReduced = useMediaQuery(MOTION_PREFERENCES.isReduced);

  useGSAP(() => {
    gsap.registerPlugin(useGSAP, ScrollTrigger);

    const leadTextSplit = splitText(leadTextRef.current);

    const contentTl = gsap.timeline({
      scrollTrigger: {
        trigger: servicesSectionRef.current,
        start: 'top 80%',
        end: 'top 66%',
        toggleActions: 'play resume resume complete',
        once: true,
      }
    });

    const enterAnimation = () => {
      animateInView('.lead-text').from(servicesSectionRef.current, {
        opacity: 0,
        y: !isMotionReduced ? 30 : 0,
        duration: 1,
      });

      animateInView('.lead-text').from(leadTextSplit.identifier, {
        y: !isMotionReduced ? '100%' : 0,
        rotateX: !isMotionReduced ? -90 : 0,
        rotateZ: !isMotionReduced ? 10 : 0,
        stagger: 0.05
      });

      contentTl.from('.content', {
        opacity: 0,
        y: !isMotionReduced ? 30 : 0,
        duration: 1,
      });
    };

    enterAnimation();
  }, { scope: servicesSectionRef });

  return (
    <section id="stuff-i-do" className="w-full h-screen pb-4xl" ref={servicesSectionRef}>
      <section className="constrained mx-auto mb-md flex flow-row wrap-none jc-space-between ai-center gap-sm">
        <div>
          <h1 ref={leadTextRef} className="lead-text family-supertitle size-3xl @medium:size-4xl letter-spacing-condensed">Stuff I do</h1>
          <p className="content de-emphasize size-md weight-light">Here are some of the services I offer.</p>
        </div>
      </section>
      <ul className="service-container constrained flex flow-column gap-lg @medium:gap-xl list-style-none">
        <ServiceCard
          title="Design"
          description="I design websites and applications with Figma that are visually appealing, and delightful to use, leaving a lasting impression on your users."
          media={DesignHero}
          alt="Design services image."
        />
        <ServiceCard
          title="Development"
          description="I develop websites and web applications that are pleasing to look at, delightful to use, and accessible to all using the most up-to-date and reliable technologies to meet your business' demanding needs."
          media={DevelopmentHero}
          alt="Development services image."
        />
        <ServiceCard
          title="Design Systems"
          description="I build custom tools that govern interfaces from design to development across an ecosystem of products to unify experiences and increase designer and developer productivity."
          media={DesignSystemsHero}
          alt="Design Systems services image."
        />
      </ul>
    </section>
  );
};

export default ServiceSection;