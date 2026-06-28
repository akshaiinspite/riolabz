import './CurvedScrollText.css';

const CurvedScrollText = () => {
  const text = "VFX • CGI • VR MAKING STUDIO • ";
  // Repeat enough times to fill the path twice so we can animate from 0 to -50% seamlessly
  const repeatedText = text.repeat(10); 

  return (
    <div className="curved-scroll-container">
      <svg viewBox="0 150 1000 220" className="curved-svg" preserveAspectRatio="xMidYMax meet">
        <path
          id="curve"
          d="M -200,50 A 1000,1000 0 0,0 1200,50"
          fill="transparent"
        />
        <text className="curved-text">
          <textPath href="#curve" startOffset="0">
            {repeatedText}
            <animate
              attributeName="startOffset"
              from="0%"
              to="-50%"
              begin="0s"
              dur="20s"
              repeatCount="indefinite"
            />
          </textPath>
        </text>
      </svg>
    </div>
  );
};

export default CurvedScrollText;
