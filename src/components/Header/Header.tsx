import './Header.css';
import logoImg from '../../assets/images/logo/xalt-studios-logo.webp';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <img src={logoImg} alt="Xalt Studio Logo" className="logo" />
      </div>
      
      <nav className="header-center">
        <a href="#platform" className="nav-link">Platform <span className="chevron">v</span></a>
        <a href="#pricing" className="nav-link">Pricing</a>
        <a href="#resources" className="nav-link">Resources</a>
        <a href="#blog" className="nav-link">Blog</a>
      </nav>

      <div className="header-right">
        <div className="hamburger-menu">
          <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Header;
