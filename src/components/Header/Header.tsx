import './Header.css';
import logoImg from '../../assets/images/logo/xalt-studios-logo.webp';

const Header = () => {
  return (
    <header className="header">
      <nav className="header-left">
        <a href="#about" className="nav-link">ABOUT</a>
        <a href="#projects" className="nav-link">PROJECTS</a>
      </nav>
      
      <div className="header-center">
        <img src={logoImg} alt="Xalt Studio Logo" className="logo" />
      </div>

      <div className="header-right">
        <a href="#apply" className="nav-link apply-btn">CONTACT</a>
        <div className="hamburger-menu">
          <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="9" x2="21" y2="9"></line>
            <line x1="3" y1="15" x2="21" y2="15"></line>
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Header;
