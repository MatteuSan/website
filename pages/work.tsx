import React from 'react';
import { NextPage } from "next";
import DefaultLayout from "./layouts/DefaultLayout";
import { HCButton, HCCard } from '../components';

import { works } from "../constants/works";

const Work: NextPage = () => {
    return (
        <DefaultLayout title="WORK" heroTitle="Works" heroSubtitle="Projects made for clients, and for myself :)" hasHero>
            <section className="content-section">
                <div className="grid" id="projects">
                    { works.map((data, key) => {
                        return (
                            <HCCard
                                key={ key }
                                title={ data.name }
                                description={ data.desc }
                                media={ `/img/` + data.media }
                                tags={ data.tags }
                            >
                                <HCButton link={ data.link } type="filled" isDisabled={ data.link == null }>Visit</HCButton>
                            </HCCard>
                        );
                    }) }
                </div>
            </section>
        </DefaultLayout>
    );
};

export default Work;