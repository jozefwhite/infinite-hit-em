// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { PlayerProvider } from './context/PlayerContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PlayerProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PlayerProvider>
  </React.StrictMode>
);
