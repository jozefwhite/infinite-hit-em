// src/components/MiniPlayer.jsx

import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import styles from './MiniPlayer.module.css';

const MiniPlayer = () => {
  const { isPlaying, togglePlayPause, currentSongIndex, songs } = usePlayer();

  if (!songs || songs.length === 0) {
    return <div className={styles.miniPlayer}>No Song Available</div>;
  }

  const currentSong = songs[currentSongIndex];

  return (
    <div className={styles.miniPlayer}>
      <h4>{currentSong.title}</h4>
      <button onClick={togglePlayPause}>{isPlaying ? '⏸️' : '▶️'}</button>
    </div>
  );
};

export default MiniPlayer;
