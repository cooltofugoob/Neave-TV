// App.js
import { useState, useEffect, useRef } from 'react';
import videos from './videos';
import './App.css';

function VideoTV() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [videoSize, setVideoSize] = useState({ width: 0, height: 0 });
  const videoRef = useRef(null);

  const getRandomVideo = () => Math.floor(Math.random() * videos.length);

  const handleClick = () => {
    setIsLoading(true);
    setHasError(false);
    setCurrentVideoIndex(prev => (prev + 1) % videos.length);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      const aspectRatio = video.videoWidth / video.videoHeight;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      
      if (screenWidth / screenHeight > aspectRatio) {
        setVideoSize({
          width: screenHeight * aspectRatio,
          height: screenHeight
        });
      } else {
        setVideoSize({
          width: screenWidth,
          height: screenWidth / aspectRatio
        });
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (videoRef.current) {
        handleLoadedMetadata();
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  }, [currentVideoIndex]);

  return (
    <div 
      className="crt-screen"
      onClick={handleClick}
      role="button"
      tabIndex="0"
    >
      <div className="crt-overlay"></div>

      {isLoading && (
        <div className="loading-container">
          <div className="dvd-loader">DVD</div>
        </div>
      )}

      <div className="tv-frame" style={{
        width: `${videoSize.width}px`,
        height: `${videoSize.height}px`
      }}>
        {!hasError ? (
          <video
            ref={videoRef}
            src={`${process.env.PUBLIC_URL}/videos/${videos[currentVideoIndex]}`}
            muted={false}
            autoPlay
            playsInline
            onError={handleError}
            onLoadedMetadata={handleLoadedMetadata}
            className="video-player"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        ) : (
          <div className="error-message">
            <div className="error-icon">⚠️</div>
            NO SIGNAL
          </div>
        )}

        <div className="channel-display">
          CH {currentVideoIndex + 1}
        </div>
      </div>
    </div>
  );
}

export default VideoTV;
