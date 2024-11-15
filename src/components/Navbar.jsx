// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { BsMusicPlayerFill } from 'react-icons/bs';
import { FaQuestion, FaExclamation } from 'react-icons/fa'; // Import the question and exclamation icons
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
      <NavLink to="/" end className={`${styles.navItem} ${styles.logo}`}>
        <BsMusicPlayerFill className={styles.icon} /> {/* Music player icon for home */}
      </NavLink>
      <NavLink to="https://www.tabularasarecords.net/collections/hit-em" className={styles.navItem} target="_blank" rel="noopener noreferrer">
        <FaExclamation className={styles.icon} /> {/* Exclamation point icon for Merch */}
      </NavLink>
      <NavLink to="/about" className={styles.navItem}>
        <FaQuestion className={styles.icon} /> {/* Question mark icon for About */}
      </NavLink>
    </nav>
  );
};

export default Navbar;
