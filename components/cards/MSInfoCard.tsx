import React, { useRef } from 'react';
import { MSCard, MSCardContent, MSCardFooter, MSCardHeader, MSCardMedia } from "../MSCard";
import { MSButton, MSTag } from "@/components";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { BookOpenIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { Variants } from 'framer-motion';
import { SCREEN_SIZES, useMediaQuery } from '@/lib/gsap';

interface MSInfoCardProps {
  index: number,
  item: any,
  linkBase: any
}

export const MSInfoCard: React.FC<MSInfoCardProps> = ({ index, item, linkBase }) => {
  const infoCardRef = useRef(null);
  const isSizeLarge = useMediaQuery(SCREEN_SIZES.isLarge);

  const variants: Variants = {
    initial: {
      opacity: 0,
      x: index % 2 === 0 ? -30 : 30,
      y: 50,
    },
    whileInView: (index: number) => ({
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        delay: 0.1 * index,
        duration: 0.4,
        easings: [0.83, 0, 0.17, 1]
      }
    })
  }

  return <MSCard
    status={item.status}
    ref={infoCardRef}
    variants={variants}
    initial="initial"
    whileInView="whileInView"
    viewport={{ once: true, margin: '-20%' }}
    custom={index}
  >
    { item.media ? (
      <MSCardMedia media={`/img/${item.media}`} alt={ `${item.name} media.` } />
    ) : null }
    <div className="ms-card__details">
      <MSCardHeader
        title={ item.name }
        subtitle={ item.desc }
        link={ item.slug && `/${linkBase}/${ item.slug }` }
        style={{ marginBlockEnd: '1rem' }}
      />
      <MSCardContent>
        <div className="flex flow-row wrap-none gap-sm" style={{ overflow: 'auto hidden' }}>
          { item.tags.slice(0, 4).map((tag: string, key: number) => {
            return <MSTag key={key}>{ tag }</MSTag>;
          }) }
          { item.tags.length > 4 ? (<MSTag>+{item.tags.length - 4}</MSTag>) : null }
        </div>
      </MSCardContent>
      <MSCardFooter>
        { item.slug ?
          <MSButton link={ `/${linkBase}/${ item.slug }` } type="outlined">View project details</MSButton> : null }
        { !item.slug && item.link != null ?
          <MSButton link={ item.link } icon={ ["left", <GlobeAltIcon/>] }
                    type="outlined">Visit</MSButton> : null }
        { !item.slug && item.links && item.links.src ?
          <MSButton link={ item.links.src } icon={ ["left", <SiGithub/>] }
                    type="outlined">Source</MSButton> : null }
        { !item.slug && item.links && item.links.docs ?
          <MSButton link={ item.links.docs } icon={ ["left", <BookOpenIcon/>] }
                    type="outlined">Docs</MSButton> : null }
      </MSCardFooter>
    </div>
  </MSCard>;
}