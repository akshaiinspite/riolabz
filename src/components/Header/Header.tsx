import './Header.css';
import logoImg from '../../assets/images/logo/xalt-studios-logo.webp';

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <img src={logoImg} alt="Xalt Studio" className="logo" />
      </div>
      
      <div className="header-nav-pill">
        <nav className="nav-links">
          <a href="#">Home</a>
          <a href="#">About Us</a>
          <a href="#">Service</a>
          <a href="#">Pricing</a>
        </nav>
      </div>
      
      <div className="header-menu-btn">
        <button className="hamburger-btn">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
            <line x1="4" y1="8" x2="20" y2="8"></line>
            <line x1="4" y1="16" x2="20" y2="16"></line>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
