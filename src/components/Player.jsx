// src/components/Player.jsx
import React, { useState, useEffect, useRef } from 'react';
import { request, gql } from 'graphql-request';
import styles from './Player.module.css';
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaForward,
  FaBackward,
} from 'react-icons/fa';

const endpoint = import.meta.env.VITE_HYGRAPH_ENDPOINT;

const Player = () => {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (audio.paused) {
        audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleNextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    setProgress(0);
  };

  const handlePrevSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : songs.length - 1));
    setProgress(0);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleProgressClick = (e) => {
    const progressBar = e.target;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const newTime = (clickPosition / rect.width) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress((newTime / audioRef.current.duration) * 100);
  };

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    const fetchSongs = async () => {
      const query = gql`
        {
          songs {
            id
            title
            artist
            audioFile {
              url
            }
            albumArtwork {
              url
            }
          }
        }
      `;
      try {
        const data = await request(endpoint, query);
        setSongs(data.songs);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };
    fetchSongs();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      audio.addEventListener('timeupdate', () => {
        setProgress((audio.currentTime / audio.duration) * 100);
      });
    }
  }, [volume]);

  return (
    <div className={styles.player}>
      {currentSong && (
        <>
          <div className={styles.albumContainer}>
            <img
              src={currentSong.albumArtwork.url}
              alt={`Album artwork for ${currentSong.title}`}
              className={`${styles.albumArtwork} ${isPlaying ? styles.playing : ''}`} // Apply playing class conditionally
            />
          </div>
          <div className={styles.songInfo}>
            <h2 className={styles.songTitle}>{currentSong.title}</h2>
            <p className={styles.songArtist}>{currentSong.artist}</p>
          </div>
          <audio ref={audioRef} src={currentSong.audioFile.url} />
          <div className={styles.controlsContainer}>
            <div className={styles.progressBarContainer} onClick={handleProgressClick}>
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
