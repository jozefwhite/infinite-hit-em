// src/components/Player.jsx
import React, { useContext, useRef, useEffect } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import styles from './Player.module.css';
import { FaPlay, FaPause, FaVolumeUp, FaForward, FaBackward } from 'react-icons/fa';

const Player = () => {
  const {
    songs,
    currentSongIndex,
    isPlaying,
    volume,
    setVolume,
    togglePlayPause,
    handleNextSong,
    handlePrevSong,
    progress,
    setProgress,
  } = useContext(PlayerContext);

  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  const currentSong = songs[currentSongIndex];

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleProgressClick = (e) => {
    updateProgress(e.clientX);
  };

  const updateProgress = (clientX) => {
    const progressBar = progressBarRef.current;
    const audio = audioRef.current;

    if (progressBar && audio) {
      const rect = progressBar.getBoundingClientRect();
      const clickPosition = clientX - rect.left;
      const newTime = (clickPosition / rect.width) * audio.duration;
      audio.currentTime = newTime;
      setProgress((newTime / audio.duration) * 100);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;

      const updateProgress = () => {
        setProgress((audio.currentTime / audio.duration) * 100);
      };

      audio.addEventListener('timeupdate', updateProgress);

      return () => {
        audio.removeEventListener('timeupdate', updateProgress);
      };
    }
  }, [volume, currentSongIndex]);

  return (
    <div className={`${styles.player}`}>
      {currentSong && (
        <>
          <div className={styles.albumContainer}>
            <img
              src={currentSong.albumArtwork.url}
              alt={`Album artwork for ${currentSong.title}`}
              className={`${styles.albumArtwork} ${isPlaying ? styles.playing : ''}`}
            />
          </div>
          <div className={styles.songInfo}>
            <h2 className={styles.songTitle}>{currentSong.title}</h2>
            <p className={styles.songArtist}>{currentSong.artist}</p>
          </div>
          <audio ref={audioRef} src={currentSong.audioFile.url} preload="metadata" />
          <div className={styles.controlsContainer}>
            <div
              className={styles.progressBarContainer}
              ref={progressBarRef}
              onClick={handleProgressClick}
            >
              <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
            </div>
            <div className={styles.controls}>
              <button onClick={handlePrevSong} className={styles.controlButton}>
                <FaBackward />
              </button>
              <button onClick={togglePlayPause} className={styles.controlButton}>
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <button onClick={handleNextSong} className={styles.controlButton}>
                <FaForward />
              </button>
            </div>
            <div className={styles.volumeControl}>
              <FaVolumeUp className={styles.volumeIcon} />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className={styles.volumeSlider}
                aria-label="Volume Slider"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Player;
