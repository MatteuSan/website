import React from 'react';
import Link from "next/link";
import { useRouter } from "next/router";

interface MSCNavbarProps {
    trigger: boolean;
}

interface MSCNavbarItemProps {
    label?: string;
    link: string;
}

const MSCNavbar: React.FC<MSCNavbarProps> = ({ trigger }) => {
    return (
        <nav className={`msc-navbar${trigger ? ' open' : ''}`}>
            <MSCNavbarItem link="/">Home</MSCNavbarItem>
            <MSCNavbarItem link="/work">Work</MSCNavbarItem>
            <MSCNavbarItem link="/tools">Tools</MSCNavbarItem>
            <MSCNavbarItem link="https://github.com/MatteuSan">GitHub</MSCNavbarItem>
        </nav>
    );
};

const MSCNavbarItem: React.FC<MSCNavbarItemProps> = ({ label, link, children }) => {
    const router = useRouter();
    const isActive = router.pathname === link

    return (
        <div className={`msc-navbar__item${ isActive ? ' active' : '' }`}>
            <Link href={ link }>
                { label || children }
            </Link>
        </div>
    );
}

export default MSCNavbar;