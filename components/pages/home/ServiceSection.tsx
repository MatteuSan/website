import React, { useRef } from 'react';
import ServiceCard from "@/components/pages/home/ServiceCard";

import DesignHero from "@/assets/static/design--hero.png";
import DevelopmentHero from "@/assets/static/development--hero.png";
import DesignSystemsHero from "@/assets/static/design-systems--hero.png";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ServiceSection: React.FC = ( ) => {
  const servicesSectionRef = useRef<HTMLDivElement>(null);
  const servicesCarouselRef = useRef<HTMLUListElement>(null);

  useGSAP(() => {
    const SERVICE_TILES = gsap.utils.toArray('.ms-carousel__item');
    const contentTl = gsap.timeline({
      scrollTrigger: {
        trigger: servicesSectionRef.current,
        start: 'top 80%',
        end: 'top 66%',
        scrub: true,
        toggleActions: 'play pause resume reset',
      }
    });

    const initialState = () => {
      gsap.set(servicesSectionRef.current, {
        opacity: 0,
        y: 30
      });

      SERVICE_TILES.forEach((tile: any, key: number) => {
        gsap.set(tile, {
          opacity: 0,
          xPercent: key % 2 === 0 ? -33 : 33,
        });

        // gsap.set(`#${tile.id} .ms-carousel__media`, {
        //   x: 0,
        // });
      });
    };

    const enterAnimation = () => {
      contentTl.to(servicesSectionRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
      });

      SERVICE_TILES.forEach((tile: any, key: number) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: tile,
            start: 'top 95%',
            end: 'bottom 77%',
            scrub: true,
            toggleActions: 'play pause resume reset',
            // markers: true
          }
        });

        tl.to(tile, {
          opacity: 1,
          xPercent: 0,
          duration: 1,
          ease: 'power2',
          stagger: {
            amount: 0.05
          }
        }, '-=2');
        // tl.to(`#${tile.id} .ms-carousel__media`, {
        //   x: key % 2 === 0 ? 30 : -30,
        // }, '<10%');
        // tl.to(tile, {
        //   opacity: 0,
        //   duration: 1,
        // });
      });
    };

    const exitAnimation = () => {

    };

    initialState();
    enterAnimation();
    exitAnimation();
  }, { scope: servicesCarouselRef });

  return (
    <section id="stuff-i-do" className="w-full h-screen pb-4xl" ref={servicesSectionRef}>
      <section className="constrained mx-auto mb-md flex flow-row wrap-none jc-space-between ai-center gap-sm">
        <div>
          <h1 className="lead-text family-supertitle size-3xl @medium:size-4xl">Stuff I do</h1>
          <p className="content de-emphasize size-md weight-light">Here are some of the services I offer.</p>
        </div>
      </section>
      <ul className="constrained flex flow-column gap-xl @medium:gap-2xl @large:gap-3xl list-style-none" ref={servicesCarouselRef}>
        <ServiceCard
          title="Design"
          description="I design websites and applications with Figma that are visually appealing, and delightful to use, leaving a lasting impression on your users."
          media={DesignHero}
          alt="Design services image."
          id="design"
          link={{ pathname: '/work', query: { filter: 'Design' } }}
        />
        <ServiceCard
          title="Development"
          description="I develop websites and web applications that are pleasing to look at, delightful to use, and accessible to all using the most up-to-date and reliable technologies to meet your business' demanding needs."
          media={DevelopmentHero}
          alt="Development services image."
          id="development"
          link={{ pathname: '/work', query: { filter: 'Development' } }}
        />
        <ServiceCard
          title="Design Systems"
          description="I build custom tools that govern interfaces from design to development across an ecosystem of products to unify experiences and increase designer and developer productivity."
          media={DesignSystemsHero}
          alt="Design Systems services image."
          id="design-systems"
          link={{ pathname: '/tools', query: { filter: 'Design System' } }}
        />
      </ul>
    </section>
  );
};

export default ServiceSection;