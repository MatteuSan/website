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

import React from 'react';
import MSTag from './MSTag';

interface MSCardProps {
  title: string;
  icon?: string | React.ReactNode;
  description?: string;
  media?: string;
  tags?: any;
  hasNoAction?: boolean;
  children?: React.ReactNode;
}

const MSCard: React.FC<MSCardProps> = ({ title, icon, description, media, tags, hasNoAction, children }) => {
  return (
    <div className="ms-card flex flow-column jc-start">
      { media &&
        <div className="ms-card__media">
          <img src={ media } alt={ title + ` media` } loading="lazy" />
        </div>
      }
      <div className="ms-card__header">
        <>
          {/* icon && <i className="ms-card__icon" aria-hidden="true">{ icon }</i>*/}
          <div className="ms-card__mast">
            <div className="ms-card__title">
              <h2>{ title }</h2>
            </div>
            { tags &&
              <div className="flex flow-row gap-xs mt-sm">
                { tags.map((tag: string, key: any) => {
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
    </div>
  );
};

export default MSCard;