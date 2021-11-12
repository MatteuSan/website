import React from 'react';

interface MSCCardProps {
    title: string;
    icon?: string;
    description?: string;
    media?: string;
    hasNoAction?: boolean;
}

const MSCCard: React.FC<MSCCardProps> = ({ title, icon, description, media, hasNoAction, children }) => {
    if (hasNoAction) {
        return (
            <div className="msc-card">
                { media &&
                <div className="msc-card__media">
                    <img src={ media } alt={ title + ` media` } loading="lazy" />
                </div>
                }
                <div className="msc-card__content">
                    <div>
                        <div className="msc-card__title">
                            { icon && <i className="msc-card__title__icon material-icons" aria-hidden="true">{ icon }</i> }
                            <h2>{ title }</h2>
                        </div>
                        { children && <p className="msc-card__subtitle">{ children }</p> }
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="msc-card">
                { media &&
                <div className="msc-card__media">
                    <img src={ media } alt={ title + ` media` } />
                </div>
                }
                <div className="msc-card__content">
                    <div>
                        <div className="msc-card__title">
                            { icon && <i className="msc-card__title__icon material-icons" aria-hidden="true">{ icon }</i> }
                            <h2>{ title }</h2>
                        </div>
                        { description && <p className="msc-card__subtitle">{ description }</p> }
                    </div>
                    { children &&
                    <div className="msc-card__actions">
                        { children }
                    </div>
                    }
                </div>
            </div>
        );
    }
};

export default MSCCard;