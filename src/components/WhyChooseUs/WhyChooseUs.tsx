import { useRef } from 'react';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section ref={containerRef} className="why-choose-us-section">
      <div className="why-title-wrapper">
        <h2 className="why-title">Why Choose Us</h2>
      </div>

      <div className="why-grid">
        {/* Left Side Texts */}
        <div className="why-column why-left">
          <div className="why-item">
            <h3>Visionary Execution</h3>
            <p>We transform abstract concepts into hyper-realistic digital experiences that captivate and convert audiences worldwide.</p>
          </div>
          <div className="why-item">
            <h3>Global Network</h3>
            <p>Leveraging deep industry ties to bring world-class talent and proprietary technology to every single project.</p>
          </div>
          <div className="why-item">
            <h3>Immersive Storytelling</h3>
            <p>Crafting deeply engaging narratives that resonate with audiences through breathtaking cinematic visuals and sound design.</p>
          </div>
        </div>

        {/* Right Side Texts */}
        <div className="why-column why-right">
          <div className="why-item">
            <h3>Cutting-Edge Tech</h3>
            <p>Utilizing the absolute latest advancements in CGI, AI, and spatial computing to stay drastically ahead of the curve.</p>
          </div>
          <div className="why-item">
            <h3>Uncompromising Quality</h3>
            <p>Every frame, every pixel, and every interaction is crafted with an obsessive attention to high-end detail.</p>
          </div>
          <div className="why-item">
            <h3>Agile Workflows</h3>
            <p>Seamlessly adapting to evolving project demands with optimized pipelines, ensuring rapid delivery without ever sacrificing excellence.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
