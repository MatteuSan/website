import React from 'react';

interface MSCTagProps {
    label?: string
}

const MSCTag: React.FC<MSCTagProps> = ({ label, children }) => {
    return (
        <span className="msc-tag">
            { label || children }
        </span>
    );
};

export default MSCTag;