import xaltLogo from '../../assets/images/logo/xalt-studios-logo.webp';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <img src={xaltLogo} alt="X.ALT Studios" className="footer-logo-img" />
        
        <div className="footer-links">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Projects</a>
          <a href="#">Contact</a>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="copyright">© X.ALT STUDIOS, 2026. All rights reserved.</div>
        <div className="footer-socials">
          <a href="#">Instagram</a>
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
