import './ClassicHero.css';
import Header from '../Header/Header';
import heroVideo from '../../assets/video/hero/hero.mp4';

const ClassicHero = () => {
  return (
    <div className="classic-hero">
      <video 
        className="hero-video-bg" 
        src={heroVideo} 
        autoPlay 
        loop 
        muted 
        playsInline 
      />
      <div className="hero-overlay"></div>
      
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Header />
      </div>
      
      <div className="classic-hero-grid">
        {/* Top Left */}
        <div className="hero-top-left">
          <div className="hero-badge">
            <span className="badge-icon">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </span>
            Next-Gen VFX & XR Studio
          </div>
          <h1>An Exquisite<br/>Digital Studio</h1>
        </div>

        {/* Top Right */}
        <div className="hero-top-right"></div>

        {/* Bottom Left */}
        <div className="hero-bottom-left">
          <p>Beyond Ordinary</p>
        </div>

        {/* Bottom Right */}
        <div className="hero-bottom-right">
          <p>
            We are a forward-thinking digital production studio specializing in high-end VFX, 3D animation, and immersive XR experiences. From compelling commercial campaigns to visionary films, we craft digital realities that captivate audiences and push the boundaries of visual storytelling.
          </p>
          <button className="show-reel-btn">
            View Projects
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassicHero;

