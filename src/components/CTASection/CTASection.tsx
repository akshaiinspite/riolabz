import './CTASection.css';
import logoImg from '../../assets/images/logo/xalt-studios-logo.webp';

const CTASection = () => {
  return (
    <section className="cta-section">
      <div className="cta-container">
        
        <div className="cta-content">
          <div className="cta-logo-box">
            <img src={logoImg} alt="X.ALT Studio" className="cta-logo-img" />
          </div>
          
          <h2 className="cta-heading">
            Starting has never been <span className="cta-highlight">easier</span>
          </h2>
          
          <button className="cta-button">
            Start a Project
          </button>
        </div>
        
      </div>
    </section>
  );
};

export default CTASection;
