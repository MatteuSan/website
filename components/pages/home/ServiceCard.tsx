import React from 'react';
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from 'next/image';

import { motion } from 'framer-motion';

interface ServiceCardProps {
  title: string;
  description: string;
  media: StaticImport | string;
  alt?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, media, alt }) => {
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

  return (
    <motion.li className="service-card" variants={variants} initial="initial" whileInView="visible" viewport={{ once: true, margin: '-20%' }}>
      <div className="service-card__media">
        <Image
          src={media}
          alt={alt || `${title} services media.`}
          width={1920}
          height={1080}
        />
      </div>
      <div className="service-card__content">
        <h2 className="family-supertitle size-xl weight-normal letter-spacing-condensed line-height-condensed mb-sm">
          <span className="highlight">{ title }</span>
        </h2>
        <p className="size-sm weight-light family-subtitle">
          { description }
        </p>
      </div>
    </motion.li>
  );
};

export default ServiceCard;