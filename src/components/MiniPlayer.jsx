// src/components/MiniPlayer.jsx
import React, { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import styles from './MiniPlayer.module.css';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaPause, FaForward } from 'react-icons/fa';

const MiniPlayer = () => {
  const { songs, currentSongIndex, isPlaying, togglePlayPause, handleNextSong } = useContext(PlayerContext);
  const navigate = useNavigate();

  const currentSong = songs[currentSongIndex];
  
  if (!currentSong) {
    return null; // Do not render the mini player if there's no current song.
  }

  // Navigate to the main player page
  const handleNavigateToMainPlayer = () => {
    navigate('/');
  };

  return (
    <div className={styles.miniPlayer} onClick={handleNavigateToMainPlayer}>
      {currentSong.albumArtwork?.url && (
        <img
          src={currentSong.albumArtwork.url}
          alt={`Album artwork for ${currentSong.title}`}
          className={styles.albumArtwork}
        />
      )}
      <div className={styles.controls}>
        {/* Play/Pause button - stop event propagation */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePlayPause();
          }}
          className={styles.controlButton}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        
        {/* Next button - stop event propagation */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNextSong();
          }}
          className={styles.controlButton}
        >
          <FaForward />
        </button>
      </div>
    </div>
  );
};

export default MiniPlayer;
