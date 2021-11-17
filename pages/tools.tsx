import React from 'react';
import { NextPage } from "next";
import MSCButton from "../components/MSCButton";
import DefaultLayout from "./layouts/DefaultLayout";
import MSCTitleBar from "../components/MSCTitleBar";
import MSCCard from "../components/MSCCard";
import { tools } from "../constants/tools";

const Tools: NextPage = () => {
    return (
        <DefaultLayout title="TOOLS" heroTitle="Tools" heroSubtitle="Tools I made to help me, and dev teams (and you!) build user experiences." hasHero>
            <section className="content-section">
                <div className="grid" id="projects">
                    { tools.map((data, key) => {
                        return (
                            <MSCCard
                                key={ key }
                                title={ data.name }
                                description={ data.desc }
                                tags={ data.tags }
                            >
                                <MSCButton link={ data.links.src } type="outlined"
                                           isDisabled={ data.links.src == null }>Source</MSCButton>
                                <MSCButton link={ data.links.docs } type="filled"
                                           isDisabled={ data.links.docs == null }>Docs</MSCButton>
                            </MSCCard>
                        );
                    }) }
                </div>
            </section>
        </DefaultLayout>
    );
};

export default Tools;