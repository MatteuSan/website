import React, { ComponentPropsWithoutRef, ComponentPropsWithRef, useRef } from 'react';

import Image from 'next/image';

interface MSCardHeaderProps extends ComponentPropsWithoutRef<any> {
  title: string
  subtitle?: string;
  icon?: string|React.ReactNode;
  iconPosition?: 'leading'|'trailing';
  children?: string|React.ReactNode;
  link?: string;
}

interface MSCardMediaProps extends ComponentPropsWithoutRef<any> {
  media: string;
  alt: string;
}

interface MSCardContentProps extends ComponentPropsWithoutRef<any> {
  children: string|React.ReactNode;
}

interface MSCardFooterProps extends ComponentPropsWithoutRef<any> {
  children: string|React.ReactNode;
}

interface MSCardProps extends ComponentPropsWithRef<any> {
  delay?: number;
  children?: React.ReactNode;
  isArchived?: boolean;
  status?: string;
}

export const MSCardMedia: React.FC<MSCardMediaProps> = ({ media, alt }) => {
  return (
    <div className="ms-card__media">
      <Image width={ 1920 } height={ 1080 } src={ media } alt={ alt + ` media` } loading="lazy"/>
    </div>
  );
}

export const MSCardHeader: React.FC<MSCardHeaderProps> = ({ title, subtitle, icon, iconPosition, link, children, ...props }) => {
  return (
    <div className="ms-card__header" {...props}>
      { iconPosition == 'trailing' && <i className="ms-card__icon">{ icon }</i> }
      { React.createElement((link ? 'a' : 'div'), { className: 'ms-card__mast', href: link ?? null },
        (<h2 className="ms-card__title">{ title }</h2>),
        (<h3 className="ms-card__subtitle de-emphasize">{ subtitle }</h3>)
      ) }
      { iconPosition == 'leading' && <i className="ms-card__icon">{ icon }</i> }
      { children }
    </div>
  );
}

export const MSCardContent: React.FC<MSCardContentProps> = ({ children }) => {
  return (
    <div className="ms-card__content">
      <p className="de-emphasize">{ children }</p>
    </div>
  );
}

export const MSCardFooter: React.FC<MSCardFooterProps> = ({ children }) => {
  return (
    <div className="ms-card__footer">
      { children }
    </div>
  );
}

export const MSCard: React.FC<MSCardProps> = ({ title, description, media, tags, delay, isArchived, status, children, ...props }) => {
  const bounds = useRef(null);

  return (
    <div
      ref={bounds}
      className={`ms-card${status ? ` is-${status.toLowerCase()}` : ''} flex flow-column jc-start`}
      {...props}
    >
      { children }
    </div>
  );
};

export default { MSCard, MSCardHeader, MSCardContent, MSCardFooter, MSCardMedia };