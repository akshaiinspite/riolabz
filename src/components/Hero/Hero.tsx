import './Hero.css';
import Header from '../Header/Header';
import HeroText from '../HeroText/HeroText';
import PendulumLamp from './PendulumLamp';
import heroCharacter from '../../assets/images/hero/hero-img.png';

const Hero = ({ isLoaderFinished = true }: { isLoaderFinished?: boolean }) => {
  return (
    <div className="hero-container">
      {/* Swinging Pendulum Lamp in top center */}
      <PendulumLamp />
      
      {/* Animated gradient background */}
      <div className="hero-gradient-bg"></div>
      
      {/* CGI Character Silhouette (multiply blend mode makes the white background disappear) */}
      <img src={heroCharacter} alt="Hero VFX Character" className="hero-character-silhouette" />
      
      {/* Foreground content */}
      <div className="hero-content">
        <Header />
        <HeroText isLoaderFinished={isLoaderFinished} />
        
        {/* Scroll Down Indicator */}
        <div className="scroll-down-indicator">
          <span className="scroll-text">SCROLL DOWN</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="scroll-arrow">
            <path d="M12 4V20M12 20L5 13M12 20L19 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Hero;
