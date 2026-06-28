import React, { useState, useEffect } from 'react';
import './Loader.css';

const Loader = () => {
  const [fps, setFps] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Rapidly increase fps counter to simulate a high-performance loading state
    let currentFps = 0;
    const targetFps = 144; // Using 144 to mimic high-end gaming/performance
    
    const interval = setInterval(() => {
      currentFps += Math.floor(Math.random() * 7) + 3; // Random fast jumps
      
      if (currentFps >= targetFps) {
        currentFps = targetFps;
        clearInterval(interval);
        
        // Wait a short moment at 144, then fade out the loader
        setTimeout(() => {
          setLoading(false);
        }, 600);
      }
      
      setFps(currentFps);
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`loader-container ${!loading ? 'fade-out' : ''}`}>
      <div className="loader-content">
        <div className="fps-counter">
          <span className="fps-number">{fps.toString().padStart(3, '0')}</span>
          <span className="fps-label">FPS</span>
        </div>
        <div className="loading-bar-container">
          <div 
            className="loading-bar" 
            style={{ width: `${(fps / 144) * 100}%` }}
          ></div>
        </div>
        <div className="loading-text">INITIALIZING X.ALT STUDIOS</div>
      </div>
    </div>
  );
};

export default Loader;
