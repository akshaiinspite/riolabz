import { useState, useEffect } from 'react';
import './Loader.css';

const STAGES = [
  'Initializing',
  'Loading Assets',
  'Modeling',
  'Texturing',
  'Lighting',
  'Rendering',
  'Compositing',
  'Optimizing',
  'Finalizing',
  'Welcome'
];

const getStageIndex = (p: number) => {
  if (p === 100) return 9; // Welcome
  if (p >= 90) return 8;   // Finalizing
  if (p >= 78) return 7;   // Optimizing
  if (p >= 65) return 6;   // Compositing
  if (p >= 48) return 5;   // Rendering
  if (p >= 38) return 4;   // Lighting
  if (p >= 28) return 3;   // Texturing
  if (p >= 18) return 2;   // Modeling
  if (p >= 8) return 1;    // Loading Assets
  return 0;                // Initializing
};

const Loader = ({ onFinish }: { onFinish?: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [welcomeActive, setWelcomeActive] = useState(false);

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      // Variable speed for realistic loading feedback
      let increment = Math.floor(Math.random() * 4) + 2; // 2% to 5% default
      
      if (currentProgress >= 48 && currentProgress <= 76) {
        // Slower rendering & compositing phase
        increment = Math.random() > 0.45 ? 1 : 2;
      } else if (currentProgress >= 90 && currentProgress < 99) {
        // Slow down near finalizing
        increment = 1;
      } else if (currentProgress === 99) {
        increment = 1;
      }

      currentProgress = Math.min(100, currentProgress + increment);
      setProgress(currentProgress);

      if (currentProgress === 100) {
        clearInterval(interval);
      }
    }, 75);

    return () => clearInterval(interval);
  }, []);

  // Handle welcome phase and exit transition
  useEffect(() => {
    if (progress === 100) {
      setWelcomeActive(true);
      const fadeTimer = setTimeout(() => {
        setLoading(false);
        if (onFinish) {
          setTimeout(onFinish, 900); // Allow slide up animation to complete
        }
      }, 1500); // 1.5s reading time for welcome before entering site
      
      return () => clearTimeout(fadeTimer);
    }
  }, [progress, onFinish]);

  const currentStageIdx = getStageIndex(progress);
  const currentStageText = STAGES[currentStageIdx];

  return (
    <div className={`loader-container ${!loading ? 'fade-out' : ''} ${welcomeActive ? 'welcome-granted' : ''}`}>
      {/* Cyber Grid Scanlines */}
      <div className="loader-scanline-grid"></div>

      <div className="loader-content">
        {/* Logo chevron graphic */}
        <div className="loader-chevron-logo">
          <div className="chevron-bar chevron-left"></div>
          <div className="chevron-bar chevron-right"></div>
        </div>

        {/* Big percentage counter */}
        <div className="loader-percentage-container">
          <span className="loader-percentage-number">
            {progress.toString().padStart(3, '0')}
          </span>
          <span className="loader-percentage-symbol">%</span>
        </div>

        {/* Glowing Progress bar track */}
        <div className="loader-track-container">
          <div 
            className="loader-progress-bar" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Single Row: Step-by-Step Loader Text */}
        <div className="loader-console-log">
          <span className="console-prompt">&gt;&gt;</span>
          <span className="console-text">
            {progress === 100 
              ? 'WELCOME' 
              : `${currentStageText.toUpperCase()}...`
            }
          </span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
