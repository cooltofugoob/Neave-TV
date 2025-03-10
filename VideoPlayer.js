import React, { useRef, useEffect } from 'react';

function VideoPlayer({ src, onEnded }) {
  const videoRef = useRef(null);

  // Автопроигрывание и включение полноэкранного режима при загрузке видео
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
      videoRef.current.requestFullscreen().catch((err) => {
        console.log('Fullscreen request failed:', err);
      });
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      style={{ width: '100%', height: '100%' }}
      onEnded={onEnded}
    />
  );
}

export default VideoPlayer;
