import React from 'react';
import Image from 'next/image';
import { MSButton } from "@/components";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { MSCarouselItem } from "@/components/MSCarousel";

interface ServiceCardProps {
  title: string;
  description: string;
  media: StaticImport|string;
  alt: string;
  id?: string;
  link: {
    pathname: string;
    query: any;
  }|string;
  linkText?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, media, alt, id, link, linkText = 'See examples' }) => {
  return (
    <MSCarouselItem
      id={id}
      title={title}
      description={description}
      media={media}
      alt={alt}
      link={link}
      linkText={linkText}
    />
  );
};

export default ServiceCard;