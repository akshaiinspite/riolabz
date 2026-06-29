
import xaltLogo from '../../assets/images/logo/xalt-studios-logo.webp';
import './Footer.css';

const ArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="link-arrow">
    <path d="M5 19L19 5M19 5V18.5M19 5H5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-top">
        <div className="footer-logo">
          <img src={xaltLogo} alt="XALT Studios" className="actual-logo" />
        </div>
      </div>

      <div className="footer-middle">
        <div className="footer-column">
          <span className="column-header">ABOUT</span>
          <a href="#" className="footer-link">
            Home
            <ArrowIcon />
          </a>
          <a href="#" className="footer-link">
            About
            <ArrowIcon />
          </a>
        </div>
        
        <div className="footer-column">
          <span className="column-header">INFO</span>
          <a href="#" className="footer-link">
            Projects
            <ArrowIcon />
          </a>
          <a href="#" className="footer-link">
            Contact
            <ArrowIcon />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="copyright">© X.ALT STUDIOS, 2026</div>
        <div className="social-links">
          <a href="#">INSTAGRAM</a>
          <a href="#">FACEBOOK</a>
          <a href="#">TWITTER</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
