/*
 *
 *  Copyright (c) 2021 Matteu
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 *
 */

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface HCHeaderProps {
    title: string;
    actionSection?: any;
    isScrollable?: boolean;
}

const HCHeader: React.FC<HCHeaderProps> = ({ title, actionSection, isScrollable }) => {

    const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", () =>
                setIsHeaderScrolled(window.pageYOffset > 200)
            );
        }
    }, []);

    return (
        <header className={`hc-header${ isScrollable ? ' hc-header--scrollable' : '' }${ isHeaderScrolled ? ' scrolled' : '' }`}>
            <div className="hc-header__brand">
                <Link href="/" passHref>
                    <h2>{ title }</h2>
                </Link>
            </div>
            { actionSection &&
            <div className="hc-header__actions">
                { actionSection }
            </div>
            }
        </header>
    );
};

export default HCHeader;