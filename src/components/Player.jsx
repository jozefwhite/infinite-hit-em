import React, { useEffect, useState } from 'react';
import styles from './Player.module.css';
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaForward,
  FaBackward,
} from 'react-icons/fa';
import { usePlayer } from '../context/PlayerContext';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Player = () => {
  const {
    songs,
    currentSongIndex,
    isPlaying,
    progress,
    setProgress,
    volume,
    audioRef,
    togglePlayPause,
    handleNextSong,
    handlePrevSong,
    handleVolumeChange,
  } = usePlayer();
  
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const location = useLocation();

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    // Minimize player when navigating to non-home pages
    if (location.pathname !== '/') {
      setIsMinimized(true);
    } else {
      setIsMinimized(false);
    }
  }, [location]);

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      audio.volume = volume;

      const updateProgress = () => {
        if (!isDragging) {
          setProgress((audio.currentTime / audio.duration) * 100);
        }
        requestAnimationFrame(updateProgress);
      };

      if (isPlaying) {
        requestAnimationFrame(updateProgress);
      }

      return () => {
        cancelAnimationFrame(updateProgress);
      };
    }
  }, [volume, setProgress, isDragging, isPlaying]);

  const handleProgressClick = (e) => {
    if (audioRef.current) {
      const progressBar = e.target;
      const rect = progressBar.getBoundingClientRect();
      const clickPosition = e.clientX - rect.left;
      const newTime = (clickPosition / rect.width) * audioRef.current.duration;

      audioRef.current.currentTime = newTime;
      setProgress((newTime / audioRef.current.duration) * 100);
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleProgressDrag(e);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleProgressDrag(e);
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  const handleProgressDrag = (e) => {
    if (audioRef.current) {
      const progressBar = e.target.closest(`.${styles.progressBarContainer}`);
      if (progressBar) {
        const rect = progressBar.getBoundingClientRect();
        const dragPosition = e.clientX - rect.left;
        let newTime = (dragPosition / rect.width) * audioRef.current.duration;

        newTime = Math.max(0, Math.min(newTime, audioRef.current.duration));

        audioRef.current.currentTime = newTime;
        setProgress((newTime / audioRef.current.duration) * 100);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  if (songs.length === 0) {
    return <div className={styles.loadingMessage}>Loading songs...</div>;
  }

  if(!currentSong) {
    return <div>Error: couldn't find song</div>
  }
  
  /*
  return (
    <PlayerWrapper>
      {!isMinimized && (
        <div className={styles.albumContainer}>
          <img
            src={currentSong.albumArtwork.url}
            alt={`Album artwork for ${currentSong.title}`}
            className={`${styles.albumArtwork} ${isPlaying ? styles.playing : ''}`}
          />
        </div>
      )}

      {!isMinimized && location.pathname === '/' && (
        <div className={styles.songInfo}>
          <h2 className={styles.songTitle}>{currentSong.title}</h2>
          <p className={styles.songArtist}>{currentSong.artist}</p>
        </div>
      )}

      <div className={`${styles.player} ${isMinimized ? styles.miniPlayer : ''}`}>
        <audio ref={audioRef} src={currentSong.audioFile.url} />

        {isMinimized && (
          <div className={styles.miniAlbumArtwork}>
            <img
              src={currentSong.albumArtwork.url}
              alt={`Album artwork for ${currentSong.title}`}
              className={styles.miniArtworkImage}
            />
          </div>
        )}

        {isMinimized && (
          <div>
            <img
              src={currentSong.albumArtwork.url}
              alt={`Album artwork for ${currentSong.title}`}
              className={styles.miniArtworkImage}
            />
          </div>
        )}

        <div className={`${styles.controlsContainer} ${isMinimized ? styles.miniControls : ''}`}>
          {isMinimized ? (
            <>
              <button onClick={togglePlayPause} className={styles.controlButton}>
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <button onClick={handleNextSong} className={styles.miniControlButton}>
                <FaForward />
              </button>
            </>
          ) : (
            <>
              <div
                className={styles.progressBarContainer}
                onMouseDown={handleMouseDown}
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
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className={styles.volumeSlider}
                  aria-label="Volume Slider"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </PlayerWrapper>
  );

  */


  return (
    <PlayerWrapper>
      <audio ref={audioRef} src={currentSong.audioFile.url} />
      {!isMinimized &&
        <HomePlayer>
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
        </HomePlayer>
      }
        <div className={`${styles.player} ${isMinimized ? styles.miniPlayer : ''}`}>
        {isMinimized ?
          <MiniPlayerContainer>
            <img
                src={currentSong.albumArtwork.url}
                alt={`Album artwork for ${currentSong.title}`}
                className={styles.miniArtworkImage}
            />
            <SongInfo>
              <SongTitle>{currentSong.title}</SongTitle>
              <SongArtist>{currentSong.artist}</SongArtist>
            </SongInfo>
            
            <MiniPlayerControls>
              <ControlButton onClick={togglePlayPause}>
                {isPlaying ? <FaPause /> : <FaPlay />}
              </ControlButton>
              <ControlButton onClick={handleNextSong}>
                <FaForward />
              </ControlButton>
            </MiniPlayerControls>
          </MiniPlayerContainer>
          :
          <div className={`${styles.controlsContainer} ${isMinimized ? styles.miniControls : ''}`}>
            <div
                className={styles.progressBarContainer}
                onMouseDown={handleMouseDown}
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
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className={styles.volumeSlider}
                  aria-label="Volume Slider"
                />
            </div>
          </div>
        }
        </div>
    </PlayerWrapper>
  );

};

const PlayerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px; /* Keep consistent width with player size */
  margin: 0 auto;
  padding-bottom: 2rem;

  @media (max-width: 600px) {
    max-width: 95%; /* Adjust size for mobile to maintain balance */
  }
`;

const SongInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const MiniPlayerContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 70px 1fr 120px;
  align-items: center;
`

const MiniPlayerControls = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
`;

const SongTitle = styled.p`
  margin-bottom: 0px;
`

const SongArtist = styled.p`
  margin-bottom: 0px;
  font-size: 0.7rem; /* Smaller font size for the artist name */
  color: #ccc; /* Use a light gray color for softer emphasis */
`

const HomePlayer = styled.div`
`;

const ControlButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
`

export default Player;
