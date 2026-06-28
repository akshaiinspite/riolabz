import React from 'react';
import './Showreel.css';
import showreelVideo from '../../assets/video/show-reel/showreel.mp4';

const Showreel = () => {
  return (
    <section className="showreel-section">
      <div className="showreel-video-container">
        <video 
          className="showreel-video"
          src={showreelVideo}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="showreel-overlay"></div>
      </div>
    </section>
  );
};

export default Showreel;
