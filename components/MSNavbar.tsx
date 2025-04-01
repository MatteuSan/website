import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Bars2Icon, XMarkIcon } from '@heroicons/react/24/outline';

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
      { trigger ? <XMarkIcon /> : <Bars2Icon /> }
    </button>
  );
};

export { MSNavbar, HCNavbarItem, HCNavbarTrigger };