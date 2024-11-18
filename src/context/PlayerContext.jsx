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
  const audioRef = useRef(new Audio());

  // Fetch songs from Hygraph
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

  // Update audio source when current song changes
  useEffect(() => {
    if (songs.length > 0 && audioRef.current) {
      audioRef.current.src = songs[currentSongIndex].audioFile.url;
      audioRef.current.currentTime = 0;
      audioRef.current.volume = volume;

      // Autoplay if isPlaying is true
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSongIndex]);

  // Handle play/pause without resetting the audio
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Update progress as the song plays
  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.addEventListener('timeupdate', updateProgress);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
    };
  }, [currentSongIndex]);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleNextSong = () => {
    const wasPlaying = isPlaying;
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    setProgress(0);
    setIsPlaying(wasPlaying);
  };

  const handlePrevSong = () => {
    const wasPlaying = isPlaying;
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? songs.length - 1 : prevIndex - 1
    );
    setProgress(0);
    setIsPlaying(wasPlaying);
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
  };

  return (
    <PlayerContext.Provider
      value={{
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
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  return useContext(PlayerContext);
};