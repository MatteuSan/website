import type { NextPage } from 'next'
import MSCButton from "../components/MSCButton";
import DefaultLayout from "./layouts/DefaultLayout";
import React from "react";
import MSCCard from "../components/MSCCard";
import MSCTitleBar from "../components/MSCTitleBar";

import { tools } from "../constants/tools";
import { works } from "../constants/works";
import { site } from "../constants/site";

const new_tools = tools.slice(0, 2);
const new_works = works.slice(0, 2);

const Home: NextPage = () => {
    return (
        <DefaultLayout title="HOME" heroActionLabel="Get to know me" heroAction="#about-me" hasHero>

            <section className="grid about-me" id="about-me">
                <MSCCard title="About me" icon="info" description="Hi! I'm Matt. I'm a UX Engineer based in the Philippines, and I am very passionate on building bridges from software to user. If you wish to inquire about my work, or if you just want some help with UI/UX Engineering, please click the button below">
                    <MSCButton type="filled" isDisabled>Resume</MSCButton>
                    <MSCButton type="filled" link="mailto:matteugt@gmail.com">Contact me</MSCButton>
                </MSCCard>

                <MSCCard title="Languages I speak" icon="code" hasNoAction>
                    <li>HTML</li>
                    <li>CSS/SCSS</li>
                    <li>JavaScript/TypeScript</li>
                    <li>PHP</li>
                    <li>and a bit of Python :)</li>
                </MSCCard>

                <MSCCard title="Technologies I work with" icon="computer" hasNoAction>
                    <li>Sentro (SCSS)</li>
                    <li>Tailwind CSS</li>
                    <li>ReactJS (+ Redux)</li>
                    <li>Vue</li>
                    <li>Laravel</li>
                    <li>Flask</li>
                    <li>MySQL</li>
                    <li>PostgreSQL</li>
                </MSCCard>

                <MSCCard title="Projects" icon="dashboard" description="If you are interested in taking a look on what I've been working on lately, click the button below.">
                    <MSCButton type="filled" link="#projects">Projects</MSCButton>
                </MSCCard>

                <MSCCard title="Open Source" icon="public" description="If you wish to check out and use UI/UX tools I've been developing and open-sourcing the past few months, click the button below.">
                    <MSCButton type="filled" link="#tools">Open Source Tools</MSCButton>
                </MSCCard>

                <MSCCard title="Other stuff..." icon="celebration" description="I also do music for fun, mainly arrangements and stuff. You can check them here if you like :)">
                    <MSCButton type="filled" link="https://musescore.com/MatteuSan">MuseScore</MSCButton>
                    <MSCButton type="filled" link="https://soundcloud.com/matteuhernandez">Soundcloud</MSCButton>
                </MSCCard>
            </section>

            <section className="content-section">
                <MSCTitleBar icon="dashboard">Featured works</MSCTitleBar>
                <div className="grid" id="projects">
                    { new_works.map((data, key) => {
                        return (
                            <MSCCard
                                key={ key }
                                title={ data.name }
                                description={ data.desc }
                                media={ `/img/` + data.media }
                            >
                                <MSCButton link={ data.link } type="filled" isDisabled={ data.link == null }>Visit</MSCButton>
                            </MSCCard>
                        );
                    }) }
                    <MSCButton link="/work" type="outlined" iconTrailing="arrow_forward">See more</MSCButton>
                </div>
            </section>

            <section className="content-section">
                <MSCTitleBar icon="construction">Featured tools</MSCTitleBar>
                <div className="grid" id="tools">
                    { new_tools.map((data, key) => {
                        return (
                            <MSCCard
                                key={ key }
                                title={ data.name }
                                description={ data.desc }
                            >
                                <MSCButton link={ data.links.docs } type="filled" isDisabled={ data.links.docs == null }>Docs</MSCButton>
                                <MSCButton link={ data.links.src } type="filled" isDisabled={ data.links.src == null }>Source</MSCButton>
                            </MSCCard>
                        );
                    }) }
                    <MSCButton link="/tools" type="outlined" iconTrailing="arrow_forward">See more</MSCButton>
                </div>
            </section>

        </DefaultLayout>
    )
}

export default Home
