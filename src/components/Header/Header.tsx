import { useState, useEffect } from 'react';
import './Header.css';
import logoImg from '../../assets/images/logo/xalt-studios-logo.webp';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProjectsPage, setIsProjectsPage] = useState(window.location.hash.startsWith('#projects'));

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleHash = () => {
      setIsProjectsPage(window.location.hash.startsWith('#projects'));
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHash);
    
    // Check initial scroll/hash state
    handleScroll();
    handleHash();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHash);
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetHash: string) => {
    e.preventDefault();
    const lenisInstance = (window as any).lenis;

    if (window.location.hash === targetHash) {
      // Smooth scroll to top if already on this tab
      if (lenisInstance) {
        lenisInstance.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      // Instantly reset scroll offsets before updating tab hash
      if (lenisInstance) {
        lenisInstance.scrollTo(0, { immediate: true });
      }
      window.scrollTo(0, 0);
      window.location.hash = targetHash;
    }
  };

  const handleDropdownClick = (e: React.MouseEvent<HTMLAnchorElement>, targetHash: string) => {
    e.preventDefault();
    const lenisInstance = (window as any).lenis;
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);
    window.location.hash = targetHash;
  };

  const handleLogoClick = () => {
    window.location.hash = '#home';
    const lenisInstance = (window as any).lenis;
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <header className={`header ${isScrolled || isProjectsPage ? 'scrolled' : ''}`}>
      <div className="header-logo" style={{ cursor: 'pointer' }} onClick={handleLogoClick}>
        <img src={logoImg} alt="Xalt Studio" className="logo" />
      </div>
      
      <nav className="nav-links">
        <a href="#home" className="nav-link" onClick={(e) => handleLinkClick(e, '#home')}>
          Home
          <span className="underline-indicator"></span>
        </a>
        <a href="#about" className="nav-link" onClick={(e) => handleLinkClick(e, '#about')}>
          About
          <span className="underline-indicator"></span>
        </a>
        
        {/* Projects Nav Link with Category Dropdown */}
        <div className="nav-dropdown-wrapper">
          <a href="#projects" className="nav-link" onClick={(e) => handleLinkClick(e, '#projects')}>
            Projects <span className="caret">▼</span>
            <span className="underline-indicator"></span>
          </a>
          <div className="header-dropdown-menu">
            <a href="#projects/commercial" className="header-dropdown-item" onClick={(e) => handleDropdownClick(e, '#projects/commercial')}>
              Commercial Projects
            </a>
            <a href="#projects/films" className="header-dropdown-item" onClick={(e) => handleDropdownClick(e, '#projects/films')}>
              Films & Entertainment
            </a>
            <a href="#projects/immersive" className="header-dropdown-item" onClick={(e) => handleDropdownClick(e, '#projects/immersive')}>
              AR & VR Experiences
            </a>
          </div>
        </div>

        <a href="#contact" className="nav-link" onClick={(e) => handleLinkClick(e, '#contact')}>
          Contact Us
          <span className="underline-indicator"></span>
        </a>
      </nav>
      
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
