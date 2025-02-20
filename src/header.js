import React, { useState, useEffect } from 'react';
import Basket from './basket';

function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header id="header" className={`header ${scrolled ? 'scrolled' : ''}`}>
            <img className='logo' src={`${process.env.PUBLIC_URL}/logo.svg`} alt="Logo" />
            <a className='logo-text-container' href="#hero"><p className="logo-text">Witch Market</p></a>

            <div className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>

            <nav className={`nav ${menuOpen ? 'open' : ''}`}>
                <ul>
                    <li>
                        <a href="#hero">
                            <h3><img src={`${process.env.PUBLIC_URL}/1.svg`} alt="Icon" />Про ринок</h3>
                        </a>
                    </li>
                    <li>
                        <a href="#items">
                            <h3><img src={`${process.env.PUBLIC_URL}/wand.svg`} alt="Icon" />Магічні предмети</h3>
                        </a>
                    </li>
                    <li>
                        <a href="#vendors">
                            <h3><img src={`${process.env.PUBLIC_URL}/chart.svg`} alt="Icon" />Торговці</h3>
                        </a>
                    </li>
                    <li>
                        <a href="#reviews">
                            <h3><img src={`${process.env.PUBLIC_URL}/starr.svg`} alt="Icon" />Відгуки</h3>
                        </a>
                    </li>
                    <li>
                        <a href="#offers">
                            <h3><img src={`${process.env.PUBLIC_URL}/bag.svg`} alt="Icon" />Спеціальні пропозиції</h3>
                        </a>
                    </li>
                    <li>
                        <a href="#contact">
                            <h3><img src={`${process.env.PUBLIC_URL}/contact.svg`} alt="Icon" />Контакти</h3>
                        </a>
                    </li>
                </ul>
            </nav>

            <Basket />
        </header>
    );
}

export default Header;
