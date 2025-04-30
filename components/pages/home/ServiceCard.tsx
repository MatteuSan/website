import React from 'react';
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from 'next/image';
import { m } from 'framer-motion';
import { MSButton } from '@/components';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { animateInView, MOTION_PREFERENCES, splitText, useMediaQuery } from '@/lib/gsap';

interface ServiceCardProps {
  title: string;
  description: string;
  media: StaticImport | string;
  alt?: string;
  link?: string;
  children?: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, media, alt, link, children }) => {
  const serviceCardRef = React.useRef<HTMLLIElement>(null);
  const serviceCardTitleRef = React.useRef<HTMLHeadingElement>(null);

  const isMotionReduced = useMediaQuery(MOTION_PREFERENCES.isReduced);

  const variants = {
    initial: {
      opacity: 0,
      y: 50,
    },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: 0.1 * index,
        easings: [0.83, 0, 0.17, 1]
      }
    }),
    exit: {
      opacity: 0,
      y: -50,
    }
  }

  useGSAP(() => {
    gsap.registerPlugin(useGSAP, ScrollTrigger);

    const titleSplit = splitText(serviceCardTitleRef.current);

    const enter = gsap.timeline({
      scrollTrigger: {
        trigger: serviceCardRef.current,
        start: 'top 90%',
        toggleActions: 'play complete resume complete',
      }
    });

    const exit = gsap.timeline({
      scrollTrigger: {
        trigger: serviceCardRef.current,
        start: 'top 5%',
        scrub: true,
      }
    });

    const initialState = () => {}

    const enterAnimation = () => {
      animateInView(serviceCardRef.current).from(titleSplit.identifier, {
        opacity: 0,
        y: !isMotionReduced ? 30 : 0,
        stagger: 0.05
      });

      enter.from('.content-1', {
        opacity: 0,
        y: !isMotionReduced ? 30 : 0,
        duration: 0.5,
      });

      enter.from('.content-2', {
        opacity: 0,
        y: !isMotionReduced ? 30 : 0,
        duration: 1,
      }, '<10%');

      enter.fromTo('.ms-button', {
        opacity: 0,
        y: !isMotionReduced ? 30 : 0,
        duration: 1,
      }, {
        opacity: 1,
        y: 0,
      }, '<10%');

      enter.fromTo('.content-3', {
        opacity: 0,
        y: !isMotionReduced ? 30 : 0,
        duration: 1,
      }, {
        opacity: 1,
        y: 0,
      }, '<');
    }

    const exitAnimation = () => {
      exit.to(serviceCardRef.current, {
        opacity: 0,
        y: !isMotionReduced ? -30 : 0,
      });
    }

    initialState();
    enterAnimation();
    exitAnimation();
  }, { scope: serviceCardRef });

  return (
    <m.li ref={serviceCardRef} className="service-card" variants={variants} initial="initial" whileInView="visible" viewport={{ once: true, margin: '-20%' }}>
      <div className="service-card__content">
        <h3 ref={serviceCardTitleRef} className="family-supertitle size-xl weight-normal letter-spacing-condensed line-height-condensed mb-sm">
          { title }
        </h3>
        <p className={`content-1 size-sm family-subtitle de-emphasize mb-${children ? 'md' : 'lg'}`}>
          { description }
        </p>
        { children ? (
          <div className="content-2 mb-xl">
            { children }
          </div>
        ) : null }
        { link ? (
          <MSButton link={link} type="outlined">View examples</MSButton>
        ) : null }
      </div>
      <div className="content-3 @medium:p-2xl">
        <div className="service-card__media">
          <Image
            src={media}
            alt={alt || `${title} services media.`}
            width={1920}
            height={1080}
          />
        </div>
      </div>
    </m.li>
  );
};

export default ServiceCard;