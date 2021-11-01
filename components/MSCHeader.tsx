import React, { useEffect, useState } from 'react';
import Link from "next/link";
import MSCNavbar from "./MSCNavbar";

import { site } from "../constants/site";

const MSCHeader = () => {
    const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", () =>
                setIsHeaderScrolled(window.pageYOffset > 200)
            );
        }
    }, []);


    return (
        <header className={`msc-header${ isHeaderScrolled ? ' scrolled' : '' }`}>
            <div className="msc-header__brand">
                <Link href="/">
                    <h2>{ site.name }</h2>
                </Link>
            </div>
            <div className="msc-header__nav">
                <button className="msc-navbar__trigger material-icons" onClick={ () => setIsNavbarOpen(!isNavbarOpen) }>
                    { isNavbarOpen ? 'close' : 'menu' }
                </button>
                <MSCNavbar trigger={ isNavbarOpen } />
            </div>
        </header>
    );
};

export default MSCHeader;