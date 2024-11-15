// src/App.jsx
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Player from './components/Player';
import MiniPlayer from './components/MiniPlayer';
import { PlayerProvider } from './context/PlayerContext';
import styles from './App.module.css';

const App = () => {
  const location = useLocation();

  // Display Player only on home page; MiniPlayer on other pages
  const showPlayer = location.pathname === '/';
  const showMiniPlayer = location.pathname !== '/';

  return (
    <PlayerProvider>
      <div className={styles.appContainer}>
        {/* Global Navbar */}
        <Navbar />

        {/* Page Routing */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>

        {/* Player & MiniPlayer */}
        {showPlayer && <Player />}
        {showMiniPlayer && <MiniPlayer />}
      </div>
    </PlayerProvider>
  );
};

export default App;
