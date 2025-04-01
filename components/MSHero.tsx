import React from 'react';

interface MSHeroProps {
  title: string;
  subtitle: string;
  action?: any;
}

const MSHero: React.FC<MSHeroProps> = ({ title, subtitle, action }) => {
  return (
    <section className="hc-hero">
      <div className="hc-hero__wrap">
        <h2 className="supertitle">{ title }</h2>
        <p className="subtitle">{ subtitle }</p>
        { action &&
          <div className="hc-hero__actions">
            { action }
          </div>
        }
      </div>
    </section>
  );
};

export default MSHero;