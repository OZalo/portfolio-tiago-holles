import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeUp } from 'react-icons/fa';

const AudioPlayer = ({ src, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => setDuration(audio.duration);
    const setAudioTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('loadedmetadata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);

    return () => {
      audio.removeEventListener('loadedmetadata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e) => {
    const time = e.target.value;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div style={playerContainerStyle}>
      <audio ref={audioRef} src={src} />
      
      <div style={topInfoStyle}>
        <span style={titleStyle}>{title}</span>
        <span style={timeStyle}>{formatTime(currentTime)} / {formatTime(duration)}</span>
      </div>

      <div style={controlsRowStyle}>
        <button onClick={togglePlay} style={playBtnStyle}>
          {isPlaying ? <FaPause /> : <FaPlay style={{ marginLeft: '3px' }} />}
        </button>

        <input 
          type="range" 
          value={currentTime} 
          max={duration || 0} 
          onChange={handleProgressChange} 
          style={rangeStyle}
        />

        <div style={volumeIconStyle}>
          <FaVolumeUp />
        </div>
      </div>
    </div>
  );
};

// Estilos
const playerContainerStyle = {
  backgroundColor: '#111',
  padding: '25px',
  borderRadius: '15px',
  border: '1px solid #222',
  width: '100%',
  maxWidth: '450px',
  margin: '10px auto'
};

const topInfoStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '15px',
  alignItems: 'center'
};

const titleStyle = {
  color: '#fff',
  fontSize: '0.9rem',
  fontWeight: 'bold',
  letterSpacing: '1px',
  textTransform: 'uppercase'
};

const timeStyle = {
  color: '#666',
  fontSize: '0.8rem',
  fontFamily: 'monospace'
};

const controlsRowStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '15px'
};

const playBtnStyle = {
  backgroundColor: '#fff',
  color: '#000',
  border: 'none',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  fontSize: '0.9rem',
  transition: 'transform 0.2s'
};

const rangeStyle = {
  flex: 1,
  accentColor: '#fff',
  cursor: 'pointer',
  height: '4px',
  backgroundColor: '#333',
  borderRadius: '2px'
};

const volumeIconStyle = {
  color: '#666',
  fontSize: '1rem'
};

export default AudioPlayer;
