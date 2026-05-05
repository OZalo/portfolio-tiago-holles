import React, { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa"

export default function AudioPlayer({ src, title }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [prevVolume, setPrevVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [showVolume, setShowVolume] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0
    setIsTouch(hasTouch)
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => setProgress(audio.currentTime || 0)
    const setAudioData = () => setDuration(audio.duration || 0)
    const handleEnded = () => {
      setIsPlaying(false)
      setProgress(0)
    }

    audio.addEventListener("timeupdate", updateProgress)
    audio.addEventListener("loadedmetadata", setAudioData)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", updateProgress)
      audio.removeEventListener("loadedmetadata", setAudioData)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [src]) // Atualiza se o SRC mudar

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }

  const handleSeek = e => {
    const newTime = Number(e.target.value)
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = newTime
    setProgress(newTime)
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    if (!isMuted) {
      setPrevVolume(volume > 0 ? volume : 0.5)
      audio.volume = 0
      audio.muted = true
      setVolume(0)
      setIsMuted(true)
    } else {
      const restored = prevVolume > 0 ? prevVolume : 0.5
      audio.muted = false
      audio.volume = restored
      setVolume(restored)
      setIsMuted(false)
    }
  }

  const handleVolumeChange = e => {
    const newVolume = Number(e.target.value)
    const audio = audioRef.current
    if (!audio) return
    audio.volume = newVolume
    setVolume(newVolume)
    if (newVolume > 0) {
      setPrevVolume(newVolume)
      if (isMuted) {
        audio.muted = false
        setIsMuted(false)
      }
    } else {
      audio.muted = true
      setIsMuted(true)
    }
  }

  const formatTime = time => {
    if (isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      style={containerStyle}
    >
      {/* Título do Áudio */}
      <div style={titleStyle}>{title}</div>

      {/* Barra de Progresso */}
      <div style={{ width: "100%", marginBottom: "0.6rem" }}>
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={progress}
          onChange={handleSeek}
          style={progressInputStyle}
        />
      </div>

      {/* Controles Principais */}
      <div style={controlsContainerStyle}>
        
        {/* Play/Pause e Volume */}
        <div style={leftControlsStyle}>
          
          {/* Botão Play */}
          <motion.button
            onClick={togglePlay}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={playBtnStyle}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isPlaying ? "pause" : "play"}
                initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'flex' }}
              >
                {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} style={{ marginLeft: '2px' }} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          {/* Controle de Volume */}
          <motion.div
            onMouseEnter={!isTouch ? () => setShowVolume(true) : undefined}
            onMouseLeave={!isTouch ? () => setShowVolume(false) : undefined}
            style={volumeContainerStyle}
          >
            <button onClick={toggleMute} style={volumeBtnStyle}>
              {isMuted || volume === 0 ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
            </button>

            <AnimatePresence>
              {showVolume && (
                <motion.input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "80px", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  style={volumeInputStyle}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Timer (Direita) */}
        <div style={timerStyle}>
          <span>{formatTime(progress)}</span>
          <span style={{ opacity: 0.3 }}>/</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <audio ref={audioRef} src={src} key={src} />
    </motion.div>
  )
}

// Estilos mantendo o visual da Urutau mas com cores do Tiago
const containerStyle = {
  backgroundColor: '#111',
  padding: '25px',
  borderRadius: '12px',
  border: '1px solid #222',
  width: '100%',
  maxWidth: '450px',
  margin: '10px auto',
  display: 'flex',
  flexDirection: 'column'
};

const titleStyle = {
  color: '#fff',
  fontSize: '0.8rem',
  fontWeight: 'bold',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  marginBottom: '15px',
  opacity: 0.8
};

const progressInputStyle = {
  width: "100%",
  accentColor: "#ffffff",
  cursor: "pointer",
  height: '4px',
  borderRadius: '2px'
};

const controlsContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  minHeight: "40px"
};

const leftControlsStyle = {
  display: "flex",
  alignItems: "center",
  gap: "1.5rem"
};

const playBtnStyle = {
  background: "none",
  border: "none",
  color: "#ffffff",
  cursor: "pointer",
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const volumeContainerStyle = {
  display: "flex",
  alignItems: "center",
  position: "relative",
  height: "24px",
  gap: '10px'
};

const volumeBtnStyle = {
  background: "none",
  border: "none",
  color: "#ffffff",
  cursor: "pointer",
  padding: 0,
  opacity: 0.7,
  transition: 'opacity 0.2s'
};

const volumeInputStyle = {
  accentColor: "#ffffff",
  cursor: "pointer",
  height: '4px'
};

const timerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  color: "#666",
  fontSize: "0.8rem",
  fontFamily: 'monospace'
};
