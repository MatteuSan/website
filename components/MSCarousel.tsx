import React, { ComponentPropsWithRef } from 'react';
import Image from "next/image";
import { MSButton } from "@/components/index";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

import Link from "next/link";

interface MSCarouselProps extends ComponentPropsWithRef<any> {
  a11tyLabel?: string;
  children?: React.ReactNode|string;
}

interface MSCarouselItemProps {
  id?: string;
  title: string;
  description: string;
  media: StaticImport|string;
  alt: string;
  link: {
    pathname: string,
    query: any
  }|string;
  linkText?: string;
}

const MSCarousel: React.FC<MSCarouselProps> = ({ a11tyLabel = '', children, ...props }) => {
  return (
    <ul className="ms-carousel" aria-label={ a11tyLabel ?? a11tyLabel } {...props}>
      {children}
    </ul>
  );
};

const MSCarouselItem: React.FC<MSCarouselItemProps> = ({ id, title, description, media, alt, link, linkText }) => {
  return (
    <li className="ms-carousel__item" id={id ?? id}>
      <div className="ms-carousel__media">
        <Link href={`#${id ?? id}`}>
          <Image src={media} alt={alt} style={{ aspectRatio: '16/9' }} width={1920} height={1080}/>
        </Link>
      </div>
      <div className="ms-carousel__content">
        <div>
          <h4 className="title mt-md">{title}</h4>
          <p className="body mb-md de-emphasize">{description}</p>
        </div>
        <MSButton type="outlined" link={link}>{linkText}</MSButton>
      </div>
    </li>
  );
};

export { MSCarousel, MSCarouselItem };