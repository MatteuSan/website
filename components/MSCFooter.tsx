import React from 'react';
import { site } from "../constants/site";

const MSCFooter = () => {
    return (
        <footer className="msc-footer">
            <h3 className="msc-footer__site-name">
                { site.name } <span className="msc-footer__version">v{ site.version }</span>
            </h3>
            <p className="msc-footer__copyright">Copyright &copy; { new Date().getFullYear() } - { site.author }</p>
        </footer>
    );
};

export default MSCFooter;