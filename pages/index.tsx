import React from "react";
import type { NextPage } from 'next'
import DefaultLayout from "./layouts/DefaultLayout";
import MSCButton from "../components/MSCButton";
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
                <MSCCard title="About me" icon="info" description="Hi! I'm Matt. I'm a UX Engineer based in the Philippines, and I am very passionate on building bridges from software to user.">
                    <MSCButton type="filled" isDisabled>Resume</MSCButton>
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

                <MSCCard title="Projects" icon="dashboard" description="If you are interested in taking a look on what I've been working on lately, click the button below." tags={['Web Apps', 'Websites', 'Design Systems']}>
                    <MSCButton type="filled" link="#projects">Projects</MSCButton>
                </MSCCard>

                <MSCCard title="Open Source" icon="public" description="I absolutely love doing open source projects! You can check out and use UI/UX tools I've been developing and open-sourcing the past few months by clicking the button below.">
                    <MSCButton type="filled" link="#tools">Open Source Tools</MSCButton>
                </MSCCard>

                <MSCCard title="Ready to collaborate?" icon="phone" description="I'd also be delighted to work on your project! Just click the contact button below and we'll keep in touch :)">
                    <MSCButton type="filled" link="mailto:matteugt@gmail.com" isDisabled>Contact me</MSCButton>
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
                                tags={ data.tags }
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
                                tags={ data.tags }
                            >
                                <MSCButton link={ data.links.src } type="outlined" isDisabled={ data.links.src == null }>Source</MSCButton>
                                <MSCButton link={ data.links.docs } type="filled" isDisabled={ data.links.docs == null }>Docs</MSCButton>
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
