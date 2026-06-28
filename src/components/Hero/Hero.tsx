import './Hero.css';
import Header from '../Header/Header';
import HeroText from '../HeroText/HeroText';
import PendulumLamp from './PendulumLamp';
import heroCharacter from '../../assets/images/hero/hero-img.png';

const Hero = () => {
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
        <HeroText />
      </div>
    </div>
  );
};

export default Hero;
