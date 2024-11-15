// src/context/PlayerContext.jsx

import React, { createContext, useState, useRef, useEffect, useContext } from 'react';
import { request, gql } from 'graphql-request';

const endpoint = import.meta.env.VITE_HYGRAPH_ENDPOINT;

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  const fetchSongsFromHygraph = async () => {
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
      console.log("Fetched songs data:", data); // Debugging line to check API response
      setSongs(data.songs);
    } catch (error) {
      console.error('Error fetching songs from Hygraph:', error);
    }
  };

  useEffect(() => {
    fetchSongsFromHygraph();
  }, []);

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

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        songs,
        currentSongIndex,
        isPlaying,
        progress,
        setProgress, // Added setProgress here
        volume,
        audioRef,
        togglePlayPause,
        handleNextSong,
        handlePrevSong,
        handleVolumeChange,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  return useContext(PlayerContext);
};
