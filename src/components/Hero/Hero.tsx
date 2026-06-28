import './Hero.css';
import Header from '../Header/Header';
import HeroText from '../HeroText/HeroText';

const Hero = () => {
  return (
    <div className="hero-container">
      <Header />
      <HeroText />
    </div>
  );
};

export default Hero;
