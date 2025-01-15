import { MSCard, MSCardContent, MSCardFooter, MSCardHeader, MSCardMedia } from "../MSCard";
import { stagger } from "@/lib/helpers";
import { MSButton } from "@/components";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { BookOpenIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import React from "react";

export function MSInfoCard(props: { reference: any, item: any, linkBase: string }) {
  return <MSCard
    delay={ 0.1 + stagger(props.reference, 0.1) }
    status={ props.item.status }
  >
    { props.item.media ? (
      <MSCardMedia media={`/img/${props.item.media}`} alt={ `${props.item.name} media.` } />
    ) : null }
    <div className="ms-card__details">
      <MSCardHeader
        title={ props.item.name }
        link={ props.item.slug && `/${props.linkBase}/${ props.item.slug }` }
      />
      <MSCardContent>
        { props.item.desc }
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