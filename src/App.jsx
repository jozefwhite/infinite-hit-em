// src/App.jsx

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Player from './components/Player';
import About from './pages/About';
import styles from './App.module.css';
import { PlayerProvider } from './context/PlayerContext';

const App = () => {
  return (
    <PlayerProvider>
      <div className={styles.appContainer}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Player />
      </div>
    </PlayerProvider>
  );
};

export default App;
