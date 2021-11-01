import React from 'react';

interface MSCTitleBarProps {
    title?: string;
    icon?: string;
}

const MSCTitleBar: React.FC<MSCTitleBarProps> = ({ title, icon, children }) => {
    return (
        <div className="msc-title-bar">
            { icon && <i className="msc-title-bar__icon material-icons">{ icon }</i> }
            <h2 className="msc-title-bar__title">{ title || children }</h2>
        </div>
    );
};

export default MSCTitleBar;