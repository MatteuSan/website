import React, { useState, useEffect, forwardRef } from 'react';
import Link from 'next/link';
import { m, HTMLMotionProps } from 'framer-motion';

type MSHeaderProps = {
  title: string;
  actionSection?: any;
  isScrollable?: boolean;
} & Omit<HTMLMotionProps<"div">, "ref">;

const MSHeader: React.FC<MSHeaderProps> = forwardRef<HTMLDivElement, MSHeaderProps>(({ title, actionSection, isScrollable, ...motionProps }, ref) => {
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () =>
        setIsHeaderScrolled(window.scrollY.valueOf() > (window.innerHeight - 230))
      );
    }
  }, [isHeaderScrolled]);

  return (
    <m.header
      className={ `ms-header${ isScrollable ? ' is-scrollable' : '' }${ isHeaderScrolled ? ' is-scrolled' : '' }` }
      ref={ref}
      {...motionProps}
    >
      <div className="ms-header__brand">
        <Link prefetch href="/">
          <h1 className="title">{ title }</h1>
        </Link>
      </div>
      { actionSection &&
        <div className="ms-header__actions">
          { actionSection }
        </div>
      }
    </m.header>
  );
});

export default MSHeader;