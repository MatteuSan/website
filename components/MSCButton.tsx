import React from 'react';
import Link from "next/link";

interface MSCButtonProps {
    label?: string;
    icon?: string;
    iconTrailing?: string;
    type?: string;
    link?: string|null;
    isDisabled?: boolean;
}

const MSCButton: React.FC<MSCButtonProps> = ({ label, icon, iconTrailing, type, link, isDisabled, children }) => {
    if (!link) {
        return (
            <button className={ `msc-button${ type?.includes('outlined') ? ' msc-button--outlined' : type?.includes('filled') ? ' msc-button--filled' : '' }${ type?.includes('inverted') ? ' msc-button--inverted' : '' }${ isDisabled ? ' disabled' : '' }` } disabled={isDisabled}>
                { icon && <i className="msc-button__icon material-icons">{ icon }</i> }
                { label || children && <span className="msc-button__label">{ label || children }</span> }
                { iconTrailing && <i className="msc-button__icon material-icons">{ iconTrailing }</i> }
            </button>
        );
    }

    return (
        <Link href={ link }>
            <button className={ `msc-button${ type?.includes('outlined') ? ' msc-button--outlined' : type?.includes('filled') ? ' msc-button--filled' : '' }${ type?.includes('inverted') ? ' msc-button--inverted' : '' }${ isDisabled ? ' disabled' : '' }` } disabled={isDisabled}>
                { icon && <i className="msc-button__icon material-icons">{ icon }</i> }
                { label || children && <span className="msc-button__label">{ label || children }</span> }
                { iconTrailing && <i className="msc-button__icon material-icons">{ iconTrailing }</i> }
            </button>
        </Link>
    );
};

export default MSCButton;