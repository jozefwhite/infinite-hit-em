// src/context/PlayerContext.js
import React, { createContext, useState, useEffect, useRef } from 'react';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);

  // Ref to hold audio instance
  const audioRef = useRef(new Audio());

  useEffect(() => {
    if (songs.length > 0) {
      audioRef.current.src = songs[currentSongIndex].audioFile.url;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [songs, currentSongIndex]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const togglePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
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

  useEffect(() => {
    const updateProgress = () => {
      if (audioRef.current.duration) {
        setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
      }
    };

    audioRef.current.addEventListener('timeupdate', updateProgress);

    return () => {
      audioRef.current.removeEventListener('timeupdate', updateProgress);
    };
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        songs,
        setSongs,
        currentSongIndex,
        setCurrentSongIndex,
        isPlaying,
        setIsPlaying,
        volume,
        setVolume,
        progress,
        setProgress,
        togglePlayPause,
        handleNextSong,
        handlePrevSong,
        audioRef, // Add audio ref to context to use it in both Player and MiniPlayer
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
