import React from 'react';
import Link from 'next/link';

interface MSFooterProps {
  title: string;
  version?: string | number;
  author?: string;
}

const MSFooter: React.FC<MSFooterProps> = ({ title, version, author }) => {
  return (
    <footer className="ms-footer">
      <h3 className="ms-footer__title">
        { title }
        { version && <span className="ms-footer__version">v{ version }</span> }
      </h3>
      <p className="ms-footer__copyright">Copyright &copy; { new Date().getFullYear() } - { author }</p>
      <small className="small">Prefer a printed format? Here's <Link prefetch className="ms-link" href="/resume" rel="noopener noreferrer">my resume</Link>.</small>
    </footer>
  );
};

export default MSFooter;