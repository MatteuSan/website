import React from 'react';
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from 'next/image';
import { MSButton } from '@/components';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MOTION_PREFERENCES, useMediaQuery } from '@/lib/gsap';

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

  useGSAP(() => {
    const enter = gsap.timeline({
      scrollTrigger: {
        trigger: serviceCardRef.current,
        start: 'top 85%',
        toggleActions: 'play complete play reverse',
      }
    });

    enter.fromTo(serviceCardRef.current, {
      opacity: 0,
      y: !isMotionReduced ? 30 : 0,
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

    enter.from(['.content-1', '.content-2'], {
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
  }, { scope: serviceCardRef });

  return (
    <li ref={serviceCardRef} className="service-card" id={title.toLowerCase().replace(/\s/g, '-')}>
      <div className="service-card__content">
        <h3 ref={serviceCardTitleRef} className="family-supertitle size-xl @medium:size-2xl weight-normal letter-spacing-condensed line-height-condensed mb-sm">
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
      <div className="service-card__media">
        <Image
          src={media}
          alt={alt || `${title} services media.`}
          width={1920}
          height={1080}
        />
      </div>
    </li>
  );
};

export default ServiceCard;