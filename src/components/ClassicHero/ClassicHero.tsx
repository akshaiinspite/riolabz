import './ClassicHero.css';
import Header from '../Header/Header';

const ClassicHero = () => {
  return (
    <div className="classic-hero">
      <Header />
      
      <div className="classic-hero-grid">
        {/* Top Left */}
        <div className="hero-top-left">
          <div className="hero-badge">
            <span className="badge-icon">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </span>
            An exquisite digital studio
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
            In fermentum vitae leo vel feugiat. Donec quam justo, iaculis ut convallis nec, tincidunt
            sit amet urna. Aliquam convallis est erat, ut aliquam augue pretium sed. Etiam ut purus eleifend vulputate,
            lobortis quam. Donec pretium rhoncus dui, a mollis
          </p>
          <button className="show-reel-btn">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            Show Reel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassicHero;

