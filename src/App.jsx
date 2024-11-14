// src/App.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Player from './components/Player';
import About from './pages/About'; // Update import from Info to About
import styles from './App.module.css';

const App = () => {
  return (
    <div className={styles.appContainer}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} /> {/* Update path */}
      </Routes>
      <Player />
    </div>
  );
};

export default App;
