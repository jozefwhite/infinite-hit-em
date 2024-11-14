// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
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
        Jukebox
      </NavLink>
      <NavLink to="/about" className={styles.navItem}> {/* Changed /info to /about */}
        About
      </NavLink>
    </nav>
  );
};

export default Navbar;
