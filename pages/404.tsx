import React from 'react';
import { NextPage } from "next";
import BlankLayout from "./layouts/BlankLayout";
import MSCCard from "../components/MSCCard";
import MSCButton from "../components/MSCButton";

const NotFound: NextPage = () => {
    return (
        <BlankLayout title="404 Page Not Found" description="404 - Page Not Found">
            <section className="absolute-center">
                <div className="page-error">
                    <MSCCard title="404" description="Page not found...">
                        <MSCButton link="/" type="filled">Return home</MSCButton>
                    </MSCCard>
                </div>
            </section>
        </BlankLayout>
    );
};

export default NotFound;