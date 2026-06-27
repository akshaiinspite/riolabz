import './Hero.css';
import Header from '../Header/Header';
import BackgroundVideo from '../BackgroundVideo/BackgroundVideo';
import HeroText from '../HeroText/HeroText';

const Hero = () => {
  return (
    <div className="hero-container">
      <BackgroundVideo />
      <Header />
      <HeroText />
    </div>
  );
};

export default Hero;
