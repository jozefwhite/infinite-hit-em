// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';

const titles = [
  "HIT 'EM",
  "5/4 TIME",
  "212 BPM",
  "SUPER", // Break "super crunched out sounds" into separate titles
  "CRUNCHED OUT",
  "SOUNDS"
];

const Home = () => {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  useEffect(() => {
    const isShortTitle = currentTitleIndex < 3; // First three titles
    const intervalDuration = isShortTitle ? 5000 : 1500; // 5 seconds for short titles, 1.5 seconds for split titles

    const interval = setInterval(() => {
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, intervalDuration);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [currentTitleIndex]);

  const currentTitle = titles[currentTitleIndex];

  return (
    <div className={styles.homePage}>
      <h1 className={styles.flashingTitle}>
        {currentTitle}
      </h1>
    </div>
  );
};

export default Home;
