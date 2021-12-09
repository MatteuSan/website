import React from "react";
import type { NextPage } from 'next'
import DefaultLayout from "./layouts/DefaultLayout";

import { HCButton, HCCard, HCTitleBar } from '../components';

import { tools } from "../constants/tools";
import { works } from "../constants/works";

const new_tools = tools.slice(0, 2);
const new_works = works.slice(0, 2);

const Home: NextPage = () => {
    return (
        <DefaultLayout title="HOME" heroTitle="MatteuSan" heroSubtitle="UX Engineer. Creating a meaningful bridge from software to user." heroAction={ <HCButton type="filled inverted" link="#about-me">Get to know me</HCButton> } hasHero>

            <section className="grid about-me" id="about-me">
                <HCCard title="About me" icon="info" description="Hi! I'm Matt. I'm a UX Engineer based in the Philippines, and I am very passionate on building bridges from software to user.">
                    <HCButton type="filled" isDisabled>Resume</HCButton>
                </HCCard>

                <HCCard title="Languages I speak" icon="code" hasNoAction>
                    <li>HTML</li>
                    <li>CSS/SCSS</li>
                    <li>JavaScript/TypeScript</li>
                    <li>PHP</li>
                    <li>and a bit of Python :)</li>
                </HCCard>

                <HCCard title="Technologies I work with" icon="computer" hasNoAction>
                    <li>Sentro (SCSS)</li>
                    <li>Tailwind CSS</li>
                    <li>ReactJS (+ Redux)</li>
                    <li>Vue</li>
                    <li>Laravel</li>
                    <li>Flask</li>
                    <li>MySQL</li>
                    <li>PostgreSQL</li>
                </HCCard>

                <HCCard title="Projects" icon="dashboard" description="If you are interested in taking a look on what I've been working on lately, click the button below." tags={['Web Apps', 'Websites', 'Design Systems']}>
                    <HCButton type="filled" link="#projects">Projects</HCButton>
                </HCCard>

                <HCCard title="Open Source" icon="public" description="I absolutely love doing open source projects! You can check out and use UI/UX tools I've been developing and open-sourcing the past few months by clicking the button below.">
                    <HCButton type="filled" link="#tools">Open Source Tools</HCButton>
                </HCCard>

                <HCCard title="Ready to collaborate?" icon="phone" description="I'd also be delighted to work on your project! Just click the contact button below and we'll keep in touch :)">
                    <HCButton type="filled" link="mailto:matteugt@gmail.com" isDisabled>Contact me</HCButton>
                </HCCard>
            </section>

            <section className="content-section">
                <HCTitleBar icon="dashboard">Featured works</HCTitleBar>
                <div className="grid" id="projects">
                    { new_works.map((data, key) => {
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
                    <HCButton link="/work" type="outlined full-width" iconTrailing="arrow_forward">See more</HCButton>
                </div>
            </section>

            <section className="content-section">
                <HCTitleBar icon="construction">Featured tools</HCTitleBar>
                <div className="grid" id="tools">
                    { new_tools.map((data, key) => {
                        return (
                            <HCCard
                                key={ key }
                                title={ data.name }
                                description={ data.desc }
                                tags={ data.tags }
                            >
                                <HCButton link={ data.links.src } type="outlined" isDisabled={ data.links.src == null }>Source</HCButton>
                                <HCButton link={ data.links.docs } type="filled" isDisabled={ data.links.docs == null }>Docs</HCButton>
                            </HCCard>
                        );
                    }) }
                    <HCButton link="/tools" type="outlined full-width" iconTrailing="arrow_forward">See more</HCButton>
                </div>
            </section>

        </DefaultLayout>
    )
}

export default Home;
