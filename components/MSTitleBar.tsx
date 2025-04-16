import React from 'react';

interface MSTitleBarProps {
  title?: string;
  icon?: string | React.ReactNode;
  typePreset?: string;
  className?: string;
  children?: React.ReactNode;
}

const MSTitleBar: React.FC<MSTitleBarProps> = ({ title, icon, typePreset, className, children, ...props }) => {
  return (
    <div className={`ms-title-bar${className ? ' ' + className : ''}`} {...props}>
      { icon && <i className="ms-title-bar__icon">{ icon }</i> }
      <h2 className={`ms-title-bar__title${typePreset ? ` ${typePreset}` : ' title'}`}>{ title || children }</h2>
    </div>
  );
};

export default MSTitleBar;