/*
 *
 *  Copyright (c) 2021 Matteu
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 *
 */

import React, { ComponentPropsWithoutRef, HTMLAttributes, useEffect, useRef } from 'react';
import MSTag from './MSTag';
import { m, useAnimation, useInView } from 'framer-motion';

import Image from 'next/image';

interface MSCardHeaderProps {
  title: string
  subtitle?: string;
  icon?: string|React.ReactNode;
  iconPosition?: 'leading'|'trailing';
  children?: string|React.ReactNode;
  link?: string;
}

interface MSCardMediaProps {
  media: string;
  alt: string;
}

interface MSCardContentProps {
  children: string|React.ReactNode;
}

interface MSCardFooterProps {
  children: string|React.ReactNode;
}

interface MSCardProps extends ComponentPropsWithoutRef<any> {
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

export const MSCardHeader: React.FC<MSCardHeaderProps> = ({ title, subtitle, icon, iconPosition, link, children }) => {
  return (
    <div className="ms-card__header">
      { iconPosition == 'trailing' && <i className="ms-card__icon">{ icon }</i> }
      { React.createElement((link ? 'a' : 'div'), { className: 'ms-card__mast', href: link ?? null },
        (<h2 className="ms-card__title">{ title }</h2>),
        (<h3 className="ms-card__subtitle">{ subtitle }</h3>)
      ) }
      { iconPosition == 'leading' && <i className="ms-card__icon">{ icon }</i> }
      { children }
    </div>
  );
}

export const MSCardContent: React.FC<MSCardContentProps> = ({ children }) => {
  return (
    <div className="ms-card__content">
      <p>{ children }</p>
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const cardControl = useAnimation();

  useEffect(() => {
    if (isInView) cardControl.start('final').then(r => r);
  }, [isInView]);

  return (
    <m.div
      ref={ ref }
      variants={ {
        initial: { opacity: 0, y: 40 },
        final: { opacity: 1, y: 0 }
      } }
      transition={ { duration: 0.2, ease: 'easeInOut', delay: delay ? delay : 0.2 } }
      initial="initial"
      animate={ cardControl }
      className={ `ms-card${status ? ` is-${status.toLowerCase()}` : ''} flex flow-column jc-start` }
      { ...props }
    >
      { children }
    </m.div>
  );
};

export default { MSCard, MSCardHeader, MSCardContent, MSCardFooter, MSCardMedia };