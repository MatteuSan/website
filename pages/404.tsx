import React from 'react';
import { NextPage } from "next";
import BlankLayout from "./layouts/BlankLayout";
import { HCButton, HCCard } from "../components";

const NotFound: NextPage = () => {
    return (
        <BlankLayout title="404 Page Not Found" description="404 - Page Not Found">
            <section className="absolute-center">
                <div className="page-error">
                    <HCCard title="404" description="Page not found...">
                        <HCButton link="/" type="filled">Return home</HCButton>
                    </HCCard>
                </div>
            </section>
        </BlankLayout>
    );
};

export default NotFound;