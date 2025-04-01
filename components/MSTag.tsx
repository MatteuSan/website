import React from 'react';

interface MSTagProps {
  label?: string;
  isFilled?: boolean;
  isArchived?: boolean;
  children?: React.ReactNode;
}

// const errorClasses = 'fill-error-400 ink-error-ink border-error-400';

const MSTag: React.FC<MSTagProps> = ({ label, isFilled, isArchived, children }) => {
  return (
    <span className={ `ms-badge${isFilled ? '' : ' is-outlined'}${isArchived ? ' is-archived' : ''}` }>
      <span className="ms-badge__label">{ label || children }</span>
    </span>
  );
};

export default MSTag;