import './HeroText.css';

const HeroText = () => {
  return (
    <main className="main-content">
      <div className="bottom-content">
        <h1 className="hero-title">
          C<span className="text-red-solid">r</span>afting d<span className="text-red-solid">i</span>gi<span className="text-red-solid">ta</span>l reas<span className="text-red-solid">l</span>i<span className="text-red-solid">t</span>ie<span className="text-red-solid">s</span>
        </h1>
        <p className="hero-subtitle">
          Those who come here do so regularly.<br />
          Not for attention, but for the experience itself.
        </p>
      </div>
    </main>
  );
};

export default HeroText;
