import React from 'react';

interface TechnologyProps {
  icon: React.ReactNode;
  label: string;
  color: string;
  children?: React.ReactNode | string;
}

const TechnologyChip: React.FC<TechnologyProps> = ({ icon, label, color }) => {
  return (
    // @ts-ignore
    <div className="technology" id={label.toLowerCase()} style={{ '--tech-color': color }}>
      <svg className="technology__img" fill="currentColor" role="img" viewBox="0 0 24 24"
           xmlns="http://www.w3.org/2000/svg"><title>{ label }</title>
        { icon }
      </svg>
      <p className="technology__label">{ label }</p>
    </div>
  );
};

export default TechnologyChip;