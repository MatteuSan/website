import PreviewImage from '@/components/markdown/PreviewImage';
import React from 'react';
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { MSButton } from '@/components';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MOTION_PREFERENCES, useMediaQuery } from '@/lib/gsap';

interface ServiceCardProps {
  title: string;
  description?: string;
  media?: StaticImport | string;
  alt?: string;
  link?: string;
  children?: React.ReactNode;
}

const MSServiceCard: React.FC<ServiceCardProps> = ({ title, description, media, alt, link, children }) => {
  const serviceCardRef = React.useRef<HTMLLIElement>(null);
  const serviceCardTitleRef = React.useRef<HTMLHeadingElement>(null);

  const isMotionReduced = useMediaQuery(MOTION_PREFERENCES.isReduced);

  useGSAP(() => {
    const enter = gsap.timeline({
      scrollTrigger: {
        trigger: serviceCardRef.current,
        start: 'top 85%',
        toggleActions: 'play complete play none',
      }
    });

    enter.fromTo(serviceCardRef.current, {
      opacity: 0,
      duration: 1,
    }, {
      opacity: 1,
      y: 0,
    });

    enter.fromTo('.service-card__media', {
      opacity: 0,
      duration: 1,
    }, {
      opacity: 1,
      y: 0,
    }, '-=0.5');

    enter.from('.service-card__title', {
      opacity: 0,
      y: !isMotionReduced ? 30 : 0,
      duration: 0.8,
    }, '-=0.5');

    enter.from('.service-card__description', {
      opacity: 0,
      y: !isMotionReduced ? 30 : 0,
      duration: 0.8,
    }, '-=0.5');

    enter.from('.service-card__children', {
      opacity: 0,
      y: !isMotionReduced ? 30 : 0,
      duration: 0.8,
    }, '-=0.5');

    enter.fromTo('.ms-button', {
      opacity: 0,
    }, {
      opacity: 1,
      duration: 0.2,
    }, '-=0.5');

    enter.call(() => {
      enter.revert();
    })
  }, { scope: serviceCardRef });

  return (
    <li ref={serviceCardRef} className="service-card swiper-slide" id={title.toLowerCase().replace(/\s/g, '-')}>
      { media ? (
        <div className="service-card__media">
          <PreviewImage
            src={media}
            alt={alt || `${title} services media.`}
            hasIndependentAnimation={false}
          />
        </div>
      ) : null }
      <div className="service-card__content">
        <div>
          <h3 ref={serviceCardTitleRef} className={`service-card__title family-mono size-sm de-emphasize wrap-brackets`}>
            { title }
          </h3>
          { description ? (
            <p className="service-card__description family-supertitle size-lg @medium:size-xl weight-normal line-height-x-short mt-xs">
              { description }
            </p>
          ) : null }
        </div>
        { children ? (
          <div className="service-card__children">
            { children }
          </div>
        ) : null }
        { link ? (
          <div className="w-full flex flow-row wrap-none jc-end ai-center gap-sm">
            <MSButton link={link} type="outlined">View examples</MSButton>
          </div>
        ) : null }
      </div>
    </li>
  );
};

export default MSServiceCard;