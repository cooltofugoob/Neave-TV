import React, { useState, useEffect } from 'react';
import WelcomeScreen from './WelcomeScreen';
import VideoPlayer from './VideoPlayer';
import CounterOverlay from './CounterOverlay';

// Список видео (обновляйте вручную при добавлении новых файлов)
const videos = ['/videos/video1.mp4', '/videos/video2.mp4', '/videos/video3.mp4'];

function App() {
  const [welcomeDismissed, setWelcomeDismissed] = useState(false); // Состояние приветственного экрана
  const [isPlaying, setIsPlaying] = useState(false); // Воспроизводится ли видео
  const [currentVideoSrc, setCurrentVideoSrc] = useState(''); // Текущий источник видео
  const [counter, setCounter] = useState(0); // Счетчик просмотров
  const [showCounter, setShowCounter] = useState(false); // Показывать ли счетчик

  // Проверка, был ли приветственный экран уже скрыт
  useEffect(() => {
    const dismissed = localStorage.getItem('welcomeDismissed');
    if (dismissed) {
      setWelcomeDismissed(true);
    }
  }, []);

  // Выбор случайного видео
  const selectRandomVideo = () => {
    const randomIndex = Math.floor(Math.random() * videos.length);
    return videos[randomIndex];
  };

  // Обработка клика
  const handleClick = () => {
    if (!welcomeDismissed) {
      setWelcomeDismissed(true);
      localStorage.setItem('welcomeDismissed', 'true');
    }
    const newVideoSrc = selectRandomVideo();
    setCurrentVideoSrc(newVideoSrc);
    setIsPlaying(true);
    setCounter((prev) => prev + 1);
    setShowCounter(true);
    setTimeout(() => setShowCounter(false), 2000); // Скрыть счетчик через 2 секунды
  };

  // Обработка окончания видео
  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={handleClick}
    >
      {!welcomeDismissed ? (
        <WelcomeScreen />
      ) : isPlaying ? (
        <VideoPlayer src={currentVideoSrc} onEnded={handleVideoEnd} />
      ) : (
        <div style={{ width: '100%', height: '100%', background: 'black' }} />
      )}
      {showCounter && <CounterOverlay counter={counter} />}
    </div>
  );
}

export default App;
