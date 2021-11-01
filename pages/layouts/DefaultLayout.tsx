import React from 'react';
import Head from "next/head";
import MSCHero from "../../components/MSCHero";
import MSCHeader from "../../components/MSCHeader";
import MSCFooter from "../../components/MSCFooter";

import { site } from "../../constants/site";

interface DefaultLayoutProps {
    title: string;
    description?: string;
    hasHero?: boolean;
    hasHeroAction?: boolean;
    heroTitle?: string;
    heroSubtitle?: string;
    heroAction?: string;
    heroActionLabel?: string;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ title, description, hasHero = false, heroTitle, heroSubtitle, heroAction, heroActionLabel, children }) => {
    return (
        <>
            <Head>
                <title>{ title } - { site.name } | UX Engineer</title>
                <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
                <link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp" rel="stylesheet"/>
                <link rel="apple-touch-icon" sizes="180x180" href="img/favicon.png" />
                <link rel="icon" type="img/png" sizes="32x32" href="img/favicon.png" />
                <link rel="icon" type="img/png" sizes="16x16" href="img/favicon.png" />
            </Head>
            <MSCHeader />
            { hasHero && <MSCHero title={ heroTitle } subtitle={ heroSubtitle } actionLink={ heroAction } actionLabel={ heroActionLabel } /> }
            <main className="content-wrap">
                { children }
            </main>
            <MSCFooter />
        </>
    );
};

export default DefaultLayout;