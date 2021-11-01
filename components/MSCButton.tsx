import React from 'react';
import Link from "next/link";

interface MSCButtonProps {
    label?: string;
    icon?: string;
    type?: string;
    link?: string|null;
    isDisabled?: boolean;
}

const MSCButton: React.FC<MSCButtonProps> = ({ label, icon, type, link, isDisabled, children }) => {
    if (!link) {
        return (
            <button className={ `msc-button${ type?.includes('outlined') ? ' msc-button--outlined' : type?.includes('filled') ? ' msc-button--filled' : '' }${ type?.includes('inverted') ? ' msc-button--inverted' : '' }${ isDisabled ? ' disabled' : '' }` } disabled={isDisabled}>
                { icon && <i className="msc-button__icon material-icons">{ icon }</i> }
                { label || children && <span className="msc-button__label">{ label || children }</span> }
            </button>
        );
    }

    return (
        <Link href={ link }>
            <button className={ `msc-button${ type?.includes('outlined') ? ' msc-button--outlined' : type?.includes('filled') ? ' msc-button--filled' : '' }${ type?.includes('inverted') ? ' msc-button--inverted' : '' }${ isDisabled ? ' disabled' : '' }` } disabled={isDisabled}>
                { icon && <i className="msc-button__icon material-icons">{ icon }</i> }
                { label || children && <span className="msc-button__label">{ label || children }</span> }
            </button>
        </Link>
    );
};

export default MSCButton;