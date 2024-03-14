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
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Bars2Icon } from '@heroicons/react/24/outline';
import { CloseIcon } from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";

interface HCNavBarProps {
  trigger: boolean;
    children?: React.ReactNode;
}

interface HCNavbarItemProps {
  label?: string;
  link: string;
    children?: React.ReactNode;
}

interface HCNavBarTriggerProps {
  onClick: any;
  trigger: boolean;
}

const MSNavbar: React.FC<HCNavBarProps> = ({ trigger, children }) => {
  return (
    <nav className={ `ms-navbar${ trigger ? ' is-open' : '' }` }>
      <ul className="ms-list is-selectable is-raised">
        { children }
      </ul>
    </nav>
  );
};

const HCNavbarItem: React.FC<HCNavbarItemProps> = ({ label, link, children }) => {
  const isActive = `/${useRouter().pathname.split('/')[1]}` === link;
  const isLinkExternal: boolean = (link.startsWith('http://') || link.startsWith('https://'));

  return (
    <li className={ `ms-list__item${ isActive ? ' is-active' : '' }${ isLinkExternal ? ' is-external' : '' }` }>
      <Link role="link" target={isLinkExternal ? '_blank' : '_self'} href={ link }>
        { label || children }
      </Link>
    </li>
  );
};

const HCNavbarTrigger: React.FC<HCNavBarTriggerProps> = ({ onClick, trigger }) => {
  return (
    <button className="ms-navbar__trigger" onClick={ onClick } type="button" aria-label={ trigger ? 'Close' : 'Open' }>
      { trigger ? <CloseIcon /> : <Bars2Icon /> }
    </button>
  );
};

export { MSNavbar, HCNavbarItem, HCNavbarTrigger };