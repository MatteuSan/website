import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface HCHeaderProps {
  title: string;
  actionSection?: any;
  isScrollable?: boolean;
}

const MSHeader: React.FC<HCHeaderProps> = ({ title, actionSection, isScrollable }) => {
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () =>
        setIsHeaderScrolled(window.scrollY.valueOf() > (window.innerHeight - 230))
      );
    }
  }, [isHeaderScrolled]);

  return (
    <header
      className={ `ms-header${ isScrollable ? ' is-scrollable' : '' }${ isHeaderScrolled ? ' is-scrolled' : '' }` }>
      <div className="ms-header__brand">
        <Link href="/" passHref>
          <h1 className="title">{ title }</h1>
        </Link>
      </div>
      { actionSection &&
        <div className="ms-header__actions">
          { actionSection }
        </div>
      }
    </header>
  );
};

export default MSHeader;