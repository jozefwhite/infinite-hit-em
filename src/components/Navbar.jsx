// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { BsMusicPlayerFill } from 'react-icons/bs'; // Importing BsMusicPlayerFill from Bootstrap Icons
import { FaQuestion, FaExclamation } from 'react-icons/fa'; // Importing FaQuestion and FaExclamation from FontAwesome
import styles from './Navbar.module.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ''}`}>
      <NavLink to="/" end className={`${styles.navItem} ${styles.logo} ${styles.navIcon}`}>
        <BsMusicPlayerFill /> {/* Updated icon for Jukebox to use the music player icon */}
      </NavLink>
      <a href="https://www.tabularasarecords.net/collections/hit-em" className={`${styles.navItem} ${styles.navCenterIcon}`} target="_blank" rel="noopener noreferrer">
        <FaExclamation /> {/* Exclamation point icon for external link */}
      </a>
      <NavLink to="/about" className={`${styles.navItem} ${styles.navIcon}`}>
        <FaQuestion /> {/* Updated icon for About */}
      </NavLink>
    </nav>
  );
};

export default Navbar;
