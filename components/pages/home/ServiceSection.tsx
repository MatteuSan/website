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
          <h2 ref={leadTextRef} className="lead-text family-supertitle size-3xl @medium:size-4xl letter-spacing-condensed">Stuff I do</h2>
          <p className="content de-emphasize size-md weight-light">Here's how I can help you.</p>
        </div>
      </section>
      <ul className="service-container constrained">
        <ServiceCard
          title="Design"
          description="I design interfaces that feel as good as they look—clean, accessible, and always user-centered. Every screen is crafted with care and intention, delivering the kind of experience your users expect and love."
          media={DesignHero}
          alt="Design services image."
          link="/work?filter=Design"
        >
          <ol className="service-card__list">
            <li data-service-number="01">Responsive Design</li>
            <li data-service-number="02">Wireframing and Prototyping</li>
            <li data-service-number="03">Design Audit and Consulting</li>
          </ol>
        </ServiceCard>
        <ServiceCard
          title="Development"
          description="I develop websites and web applications that are pleasing to look at, delightful to use, and accessible to all using the most up-to-date and reliable technologies to meet your business' demanding needs."
          media={DevelopmentHero}
          alt="Development services image."
          link="/work?filter=Development"
        >
          <ol className="service-card__list">
            <li data-service-number="01">Front-end Development</li>
            <li data-service-number="02">SEO and Accessibility</li>
            <li data-service-number="03">Delightful Interactions</li>
          </ol>
        </ServiceCard>
        <ServiceCard
          title="Design Systems"
          description="I specialize in building custom tools that bring consistency across design and development—unifying product experiences and boosting team productivity. From foundation to adoption, I'll help you create and maintain design systems that scale with your business needs."
          media={DesignSystemsHero}
          alt="Design Systems services image."
          link="/tools?filter=Design%20System"
        >
          <ol className="service-card__list">
            <li data-service-number="01">Design Tokens</li>
            <li data-service-number="02">Component Creation</li>
            <li data-service-number="03">Documentation and Guidelines</li>
            <li data-service-number="04">Adoption and Onboarding</li>
          </ol>
        </ServiceCard>
      </ul>
    </section>
  );
};

export default ServiceSection;