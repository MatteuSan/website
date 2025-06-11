import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Bars2Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { m, AnimatePresence } from 'framer-motion';
import { animateVariants } from '@/lib/framer';

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
      <ul className="ms-navbar__wrapper">
        { children }
      </ul>
    </nav>
  );
};

const HCNavbarItem: React.FC<HCNavbarItemProps> = ({ label, link, children }) => {
  const isActive = `/${useRouter().pathname.split('/')[1]}` === link;
  const isLinkExternal: boolean = (link.startsWith('http://') || link.startsWith('https://'));

  return (
    <li className={ `ms-navbar__item${ isLinkExternal ? ' is-external' : '' }` }>
      <Link prefetch role="link" target={isLinkExternal ? '_blank' : '_self'} href={ link }>
        { label || children }
      </Link>
    </li>
  );
};

const HCNavbarTrigger: React.FC<HCNavBarTriggerProps> = ({ onClick, trigger }) => {
  const MXMarkIcon = m(XMarkIcon);
  const MBars2Icon = m(Bars2Icon);

  const opacity = {
    initial: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 }
  }

  return (
    <button className="ms-navbar__trigger" onClick={ onClick } type="button" aria-label={ trigger ? 'Close' : 'Open' }>
      <AnimatePresence mode="wait">
        { trigger ? <MXMarkIcon transition={{ duration: 0.05 }} key="xmark" {...animateVariants(opacity)} /> : <MBars2Icon transition={{ duration: 0.05 }} key="bars2" {...animateVariants(opacity)} /> }
      </AnimatePresence>
    </button>
  );
};

export { MSNavbar, HCNavbarItem, HCNavbarTrigger };