// src/components/MiniPlayer.jsx

import React from 'react';
import { usePlayer } from '../context/PlayerContext';
// import styles from './MiniPlayer.module.css';
import styled from 'styled-components';

const MiniPlayer = () => {
  const { isPlaying, togglePlayPause, currentSongIndex, songs } = usePlayer();

  if (!songs || songs.length === 0) {
    return <Container>No Song Available</Container>;
  }

  const currentSong = songs[currentSongIndex];

  return (
    <Container>
      <Title>{currentSong.title}</Title>
      <button onClick={togglePlayPause}>{isPlaying ? '⏸️' : '▶️'}</button>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  padding: 10px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
`;

const Title = styled.h4`
  
`;

export default MiniPlayer;
