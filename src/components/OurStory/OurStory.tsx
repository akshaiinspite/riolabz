import './OurStory.css';

const OurStory = () => {
  return (
    <section className="our-story-section">
      <div className="our-story-container">
        
        {/* Left Column */}
        <div className="our-story-left">
          <div className="story-top">
            <div className="story-badge">Our Story</div>
            <h2 className="story-title">
              Our Existence<br />
              <span className="title-highlight">Explained</span>
            </h2>
          </div>
          
          {/* Decorative glowing element imitating the globe */}
          <div className="story-glow-sphere"></div>

          <div className="story-stats">
            <div className="stat-item">
              <h3>2023</h3>
              <p>Founded</p>
            </div>
            <div className="stat-item">
              <h3>Kochi</h3>
              <p>Headquarters</p>
            </div>
            <div className="stat-item">
              <h3>XR & VFX</h3>
              <p>Specialty</p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="our-story-right">
          <p>
            Founded in <strong>Kochi</strong>, X.ALT Studio emerged from a desire to push the boundaries of visual storytelling. We saw a demand for high-end visual effects and immersive digital experiences that truly captivate.
          </p>
          <p>
            Looking at the industry, we recognized a gap between traditional production and cutting-edge tech. Creators needed faster, more innovative tools to bring their visions to life without compromise.
          </p>
          <p>
            With a <strong>clear vision</strong>, we've built a studio defined by exceptional artistry and technical precision. We are here to <strong>liberate storytellers</strong>, enabling them to craft beyond ordinary realities.
          </p>
        </div>

      </div>
    </section>
  );
};

export default OurStory;
