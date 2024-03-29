import React, {useEffect, useRef, useState} from "react";

import "./Navbar.scss";
import {media} from "../../../constants/index.js";
import {HiMenuAlt4, HiX} from "react-icons/hi";
import {gsap} from "gsap";
import {useGSAP} from "@gsap/react";

const Navbar = ({toggleTheme, themes, theme, links, extLinks, forceShrink, icon}) => {
    icon = icon || media.favicon;
    const [showMenu, setShowMenu] = useState(false);
    const [isShrunk, setShrunk] = useState(!!forceShrink);
    const scrollThreshold = 32;

    const menuRef = useRef(null);

    useEffect(() => {
        if (forceShrink) return;
        let isScrolling = false;

        const handleScroll = () => {
            if (!isScrolling) {
                window.requestAnimationFrame(() => {
                    setShrunk(
                        document.body.scrollTop > scrollThreshold ||
                        document.documentElement.scrollTop > scrollThreshold
                    );
                    isScrolling = false;
                });
            }

            isScrolling = true;
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [forceShrink]);

    // Add this useEffect hook
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const [hasAnimated, setHasAnimated] = useState(true);

    useGSAP(() => {
        if (hasAnimated) {
            gsap.from([".navbar", ".navbar__shrunk"], {
                yPercent: -100,
                filter: "brightness(1.25)",
                duration: 1,
                ease: "power2.out",
                delay: 0.20,
                onComplete: () => setHasAnimated(false)
            })

            gsap.from([".app__navbar-nav-links", ".app__navbar-ext-links"], {
                yPercent: -200,
                duration: 0.90,
                ease: "power1.out",
                delay: 0.45 + 0.20,
                stagger: 0.10,
            });
        }
    }, []);

    const navbarRef = useRef(null);

    useEffect(() => {
        if (isShrunk) {
            gsap.to(navbarRef.current, {
                duration: 0.60,
                scale: 0.9, // scale down to 90% of its original size
                ease: "power1.out"
            });
        } else {
            gsap.to(navbarRef.current, {
                duration: 0.60,
                scale: 1, // back to original size
                ease: "power1.out"
            });
        }
    }, [isShrunk]);

    return (
        <nav
            ref={navbarRef}
            className={isShrunk ? " navbar__shrunk" : "navbar"}
        >
            <div className="app__navbar-icon">
                <a href="/">
                    <img src={icon} alt="jerrydev icon" />
                </a>
            </div>

            <ul
                className="app__navbar-nav-links"
            >
                {links.map((dest, index) => (
                    <li className="text" key={index}>
                        <a className="text-underline" href={dest.link}>{dest.name}</a>
                    </li>
                ))}
            </ul>
            <ul
                className="app__navbar-ext-links"
            >
                {extLinks.map((dest, index) => (
                    <li className="text" key={index}>
                        <a className="text-underline" href={dest.link} target="_blank" rel="noreferrer">{dest.name}</a>
                    </li>
                ))}
            </ul>

            <div className="app__navbar-theme-toggle">
                <button onClick={() => toggleTheme(Object.values(themes))}>
                    <div className="theme-container">
                        <div className={`theme-circle ${theme.className}`} />
                        <div className="text theme-name">{theme.name}</div>
                    </div>
                </button>
            </div>
            {/* MOBILE */}
            <div ref={menuRef} className={`${showMenu ? "app__navbar-menu" : "app__navbar-menu-hidden"}`}>
                <HiMenuAlt4 onClick={() => setShowMenu(true)} />

                <div>
                    <HiX onClick={() => setShowMenu(false)} />
                    <ul className="app__navbar-nav-links">
                        {links.map((dest, index) => (
                            <li className="text" key={index}>
                                <a className="text-underline" onClick={() => setShowMenu(false)} href={dest.link}>
                                    {dest.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <ul className="app__navbar-ext-links">
                        {extLinks.map((dest, index) => (
                            <li className="text" key={index}>
                                <a className="text-underline" onClick={() => setShowMenu(false)} href={dest.link} target="_blank" rel="noreferrer">
                                    {dest.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
