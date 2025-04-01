import React, { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';
import { UrlObject } from 'node:url';

type NativeButtonTypes = 'button' | 'submit' | 'reset' | undefined;

interface HCButtonProps extends ComponentPropsWithoutRef<any> {
  label?: string;
  icon?: [string, React.ReactNode];
  type?: string;
  nativeType?: NativeButtonTypes;
  link?: string | UrlObject | null;
  isDisabled?: boolean;
  isSubmit?: boolean;
  isReset?: boolean;
  onClick?: (() => React.MouseEventHandler | void);
  children?: React.ReactNode;
}

const MSButton: React.FC<HCButtonProps> = ({ label, icon, type, link, isDisabled, onClick, children, nativeType = 'button', ...props }) => {
  const parseTypes = (type: string): string => {
    const finalTypes: string[] = [];
    type.split(' ').forEach((type: string) => {
      finalTypes.push('is-' + type);
    });
    return finalTypes.join(' ');
  };

  const ButtonBase = (
    <>
      { icon && icon[0] == 'left' && <i className="ms-button__icon" aria-hidden="true">{ icon[1] }</i> }
      { label || children && <span className="ms-button__label">{ label || children }</span> }
      { icon && icon[0] == 'right' && <i className="ms-button__icon" aria-hidden="true">{ icon[1] }</i> }
    </>
  );

  if (!link) {
    return (
      <button
        className={ `ms-button${ type ? ' ' + parseTypes(type) : '' }` }
        role="button"
        onClick={ onClick }
        disabled={ isDisabled }
        type={nativeType}
        {...props}
      >
        { ButtonBase }
      </button>
    );
  }

  const isLinkExternal: boolean = (typeof link == 'string' ? link.startsWith('http://') || link.startsWith('https://') : false);

  return (
    <Link {...props} href={ link } className={ `ms-button${ type ? ' ' + parseTypes(type) : '' }` } role="link" target={isLinkExternal ? '_blank' : '_self'}>
      { ButtonBase }
    </Link>
  );
};

export default MSButton;