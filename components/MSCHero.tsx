import React from 'react';
import MSCButton from "./MSCButton";

import { site } from "../constants/site";

interface MSCHeroProps {
    title?: string;
    subtitle?: string;
    actionLabel?: string;
    actionLink?: string;
}

const MSCHero: React.FC<MSCHeroProps> = ({ title, subtitle, actionLabel, actionLink }) => {
    return (
        <section className="msc-hero">
            <div className="msc-hero__wrap">
                <h2>{ title ?? site.name }</h2>
                <p>{ subtitle ?? `UX Engineer. Creating a meaningful bridge from software to user.` }</p>
                { actionLabel &&
                <div className="msc-hero__actions">
                    <MSCButton type="filled inverted" link={ actionLink }>{ actionLabel ?? `Get to know me` }</MSCButton>
                </div>
                }
            </div>
        </section>
    );
};

export default MSCHero;