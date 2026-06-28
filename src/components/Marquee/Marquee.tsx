import './Marquee.css';

const Marquee = () => {
  // We repeat the text enough times to ensure it fills the screen and allows for a seamless loop.
  // The structure is word + plus sign.
  const words = ['INSPIRE', '+', 'INNOVATE', '+', 'IMPACT', '+'];
  
  // We duplicate the array to create the seamless loop (scroll to -50%)
  const content = [...words, ...words, ...words, ...words];

  return (
    <section className="marquee-container">
      <div className="marquee-content">
        {content.map((item, index) => (
          <span 
            key={index} 
            className={`marquee-item ${item === '+' ? 'marquee-plus' : 'marquee-word'}`}
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Marquee;
