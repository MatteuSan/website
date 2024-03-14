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

import React, { useEffect, useRef } from 'react';
import MSTag from './MSTag';
import { m, useAnimation, useInView } from 'framer-motion';

import Image from 'next/image';
import Link from "next/link";

interface MSCardProps {
  title: string;
  description?: string;
  media?: string;
  tags?: any;
  delay?: number;
  children?: React.ReactNode;
  link?: string | null;
}

const MSCard: React.FC<MSCardProps> = ({ title, description, media, tags, delay, link, children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const cardControl = useAnimation();

  useEffect(() => {
    if (isInView) cardControl.start('final').then(r => r);
  }, [isInView]);

  const CardBase = (
    <m.div
      ref={ ref }
      variants={ {
        initial: { opacity: 0, y: 40 },
        final: { opacity: 1, y: 0 }
      } }
      transition={ { duration: 0.2, ease: 'easeInOut', delay: delay ? delay : 0.2 } }
      initial="initial"
      animate={ cardControl }
      className="ms-card flex flow-column jc-start">
      { media &&
        <div className="ms-card__media">
          <Image width={ 1920 } height={ 1080 } src={ media } alt={ title + ` media` } loading="lazy"/>
        </div>
      }
      <div className="ms-card__header">
        <>
          {/* icon && <i className="ms-card__icon" aria-hidden="true">{ icon }</i>*/ }
          <div className="ms-card__mast">
            <div className="ms-card__title">
              <h2>{ title }</h2>
            </div>
            { tags &&
              <div className="flex flow-row gap-xs mt-sm">
                { tags.map((tag: string, key: any) => {
                  if (tag == 'Archived' || tag == 'Deprecated') {
                    return (
                      <MSTag isArchived key={ key }>{ tag }</MSTag>
                    );
                  }
                  return (
                    <MSTag key={ key }>{ tag }</MSTag>
                  );
                }) }
              </div>
            }
          </div>
        </>
      </div>
      { description &&
        <div className="ms-card__content">
          <p>{ description }</p>
        </div>
      }
      { children &&
        <div className="ms-card__footer mt-auto">
          { children }
        </div>
      }
    </m.div>
  );

  if (!link) {
    return CardBase;
  }

  return (
    <Link href={link} style={{ display: 'inherit' }}>
      {CardBase}
    </Link>
  );
};

export default MSCard;