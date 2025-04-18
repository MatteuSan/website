import React, { useRef } from 'react';
import { MSCard, MSCardContent, MSCardFooter, MSCardHeader, MSCardMedia } from "../MSCard";
import { MSButton, MSTag } from "@/components";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { BookOpenIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function MSInfoCard(props: { reference: any, item: any, linkBase: string }) {
  const cardContainerRef = useRef<HTMLDivElement>(null);

  return <MSCard
    status={ props.item.status }
    ref={cardContainerRef}
  >
    { props.item.media ? (
      <MSCardMedia media={`/img/${props.item.media}`} alt={ `${props.item.name} media.` } />
    ) : null }
    <div className="ms-card__details">
      <MSCardHeader
        title={ props.item.name }
        subtitle={ props.item.desc }
        link={ props.item.slug && `/${props.linkBase}/${ props.item.slug }` }
        style={{ marginBlockEnd: '1rem' }}
      />
      <MSCardContent>
        <div className="flex flow-row wrap-none gap-xs" style={{ overflow: 'hidden hidden' }}>
          { props.item.tech.slice(0, 4).map((tech: string, key: number) => {
            return <MSTag key={key}>{ tech }</MSTag>;
          }) }
          { props.item.tech.length > 4 ? (<MSTag>+{props.item.tech.length - 4}</MSTag>) : null }
        </div>
      </MSCardContent>
      <MSCardFooter>
        { props.item.slug ?
          <MSButton link={ `/${props.linkBase}/${ props.item.slug }` } type="outlined">View project details</MSButton> : null }
        { !props.item.slug && props.item.link != null ?
          <MSButton link={ props.item.link } icon={ ["left", <GlobeAltIcon/>] }
                    type="outlined">Visit</MSButton> : null }
        { !props.item.slug && props.item.links && props.item.links.src ?
          <MSButton link={ props.item.links.src } icon={ ["left", <SiGithub/>] }
                    type="outlined">Source</MSButton> : null }
        { !props.item.slug && props.item.links && props.item.links.docs ?
          <MSButton link={ props.item.links.docs } icon={ ["left", <BookOpenIcon/>] }
                    type="outlined">Docs</MSButton> : null }
      </MSCardFooter>
    </div>
  </MSCard>;
}