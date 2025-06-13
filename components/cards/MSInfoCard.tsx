import React, { useRef } from 'react';
import { MSCard, MSCardContent, MSCardHeader, MSCardMedia } from "../MSCard";
import { MSTag } from "@/components";
import { Variants } from 'framer-motion';
import Link from 'next/link';

interface MSInfoCardProps {
  index: number,
  item: any,
  linkBase: any
}

export const MSInfoCard: React.FC<MSInfoCardProps> = ({ index, item, linkBase }) => {
  const infoCardRef = useRef(null);

  const variants: Variants = {
    initial: {
      opacity: 0,
      scale: 0,
      borderRadius: '20rem',
    },
    whileInView: (index: number) => ({
      opacity: 1,
      scale: 1,
      borderRadius: 0,
      transition: {
        delay: (0.05 * index),
        duration: 0.4,
        easings: [0.83, 0, 0.17, 1]
      },
    })
  }

  return (
    <Link href={ item.slug ? `/${linkBase}/${ item.slug }` : '/' }>
      <MSCard
        status={ item.status }
        ref={ infoCardRef }
        variants={ variants }
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: '-10%' }}
        onAnimationComplete={() => {
          requestAnimationFrame(() => {
            if (infoCardRef.current) {
              // @ts-ignore
              infoCardRef.current.removeAttribute('style');
            }
          });
        }}
        custom={ index }
      >
        { item.media ? (
          <MSCardMedia media={ `/img/${ item.media }` } alt={ `${ item.name } media.` }/>
        ) : null }
        <div className="ms-card__details">
          <MSCardHeader
            title={ item.name }
            subtitle={ item.desc }
          />
          <MSCardContent>
            <div className="ms-card__tags flex flow-row wrap-none gap-sm mb-sm" style={ { overflow: 'auto hidden' } }>
              { item.tags.slice(0, 4).map((tag: string, key: number) => {
                return <MSTag key={ key }>{ tag }</MSTag>;
              }) }
              { item.tags.length > 4 ? (<MSTag>+{ item.tags.length - 4 }</MSTag>) : null }
            </div>
          </MSCardContent>
        </div>
      </MSCard>
    </Link>
  );
}