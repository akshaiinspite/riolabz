import React, { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import './RevealText.css';

// Import the videos
import vid1 from '../../assets/video/para/movie-motion-poster-1.min.mp4';
import vid2 from '../../assets/video/para/movie-motion-poster-2.min.mp4';
import vid3 from '../../assets/video/para/pre-viz-1.min.mp4';
import vid4 from '../../assets/video/para/pre-viz-2.min.mp4';

interface HoverVideoProps {
  src: string;
  id: string;
  activeAudioId: string | null;
  onToggleAudio: (id: string) => void;
}

const HoverVideo = ({ src, id, activeAudioId, onToggleAudio }: HoverVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const isPlayingAudio = activeAudioId === id;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isPlayingAudio;
    }
  }, [isPlayingAudio]);

  const handleAudioClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleAudio(id);
  };

  return (
    <span className="inline-video-wrapper">
      <video 
        ref={videoRef} 
        src={src} 
        autoPlay 
        loop 
        muted={!isPlayingAudio}
        playsInline 
        className="inline-video" 
      />
      <button className="audio-toggle" onClick={handleAudioClick}>
        {!isPlayingAudio ? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
        )}
      </button>
    </span>
  );
};

const RevealText = () => {
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0 }); // Triggers when element is completely out of view

  useEffect(() => {
    // If the user scrolls past this section, force mute any playing video
    if (!isInView) {
      setActiveAudioId(null);
    }
  }, [isInView]);

  const handleToggleAudio = (id: string) => {
    // If clicking the video already playing, mute it. Otherwise, set it as active (muting all others).
    setActiveAudioId(prev => prev === id ? null : id);
  };

  return (
    <section className="reveal-text-container" ref={sectionRef}>
      <div className="reveal-text-wrapper">
        <h2 className="inline-video-heading">
          Your <HoverVideo src={vid1} id="vid1" activeAudioId={activeAudioId} onToggleAudio={handleToggleAudio} /> ultimate creative team extension <HoverVideo src={vid2} id="vid2" activeAudioId={activeAudioId} onToggleAudio={handleToggleAudio} /> to execute ambitious ideas <HoverVideo src={vid3} id="vid3" activeAudioId={activeAudioId} onToggleAudio={handleToggleAudio} /> faster and radically <HoverVideo src={vid4} id="vid4" activeAudioId={activeAudioId} onToggleAudio={handleToggleAudio} /> smarter.
        </h2>
      </div>
    </section>
  );
};

export default RevealText;
