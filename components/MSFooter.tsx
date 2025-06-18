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
      <div className="flex flow-row wrap-none jc-center ai-center gap-sm">
        <Link className="ms-link small" href="/github" target="_blank">GitHub</Link>
        <Link className="ms-link small" href="/linkedin" target="_blank">LinkedIn</Link>
        <Link className="ms-link small" href="/tools">Tools</Link>
        <Link className="ms-link small" href="/blog">Blog</Link>
        <Link className="ms-link small" href="/resume" target="_blank">Resume</Link>
      </div>
    </footer>
  );
};

export default MSFooter;