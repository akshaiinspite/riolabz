import { useState, useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';
import './Showreel.css';
import showreelVideo from '../../assets/video/show-reel/showreel.mp4';

const Showreel = () => {
  const [isMuted, setIsMuted] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isInView = useInView(containerRef, { amount: 0.1 });

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    if (!isInView && !isMuted) {
      setIsMuted(true);
    }
  }, [isInView, isMuted]);

  const toggleAudio = () => {
    setIsMuted(!isMuted);
  };

  return (
    <section className="showreel-section" ref={containerRef}>
      <div className="showreel-video-container">
        <video 
          ref={videoRef}
          className="showreel-video"
          src={showreelVideo}
          autoPlay
          loop
          muted={true}
          playsInline
        />
        <div className="showreel-overlay"></div>
        
        <button className="audio-toggle-btn showreel-audio-btn" onClick={toggleAudio} aria-label="Toggle Audio">
          {isMuted ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <line x1="23" y1="9" x2="17" y2="15"></line>
              <line x1="17" y1="9" x2="23" y2="15"></line>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
          )}
        </button>
      </div>
    </section>
  );
};

export default Showreel;
