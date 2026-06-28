import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './WhatWeDo.css';

import imgCommercial from '../../assets/images/services/commercial_right.png';
import imgFilms from '../../assets/images/services/films_right.png';
import imgArvr from '../../assets/images/services/arvr_right.png';

const services = [
  {
    id: 1,
    title: 'Films & Entertainment',
    description: 'We curate and aggregate breathtaking visual sequences for feature films, leveraging deep relationships across the worldwide entertainment industry.',
    image: imgFilms
  },
  {
    id: 2,
    title: 'Commercial Projects',
    description: 'Seamlessly integrating premium tech aesthetics with robust design systems to elevate modern brand identities and digital experiences.',
    image: imgCommercial
  },
  {
    id: 3,
    title: 'AR & VR Experiences',
    description: 'Immersive digital environments and spatial computing solutions that bridge the physical and virtual worlds for interactive storytelling.',
    image: imgArvr
  }
];

const WhatWeDo = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 15%", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"]);

  return (
    <section className="what-we-do-wrapper" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      
      <div className="section-title-wrapper" style={{ paddingTop: '8rem', paddingLeft: '4rem', paddingRight: '4rem', marginBottom: '4rem' }}>
        <h2 className="section-title">What We Do</h2>
      </div>

      <div ref={targetRef} className="horizontal-scroll-container">
        <div className="sticky-scroll-wrapper">
          <motion.div style={{ x }} className="horizontal-scroll-track">
          {services.map((service) => (
            <div key={service.id} className="scroll-card">
              <h3 className="scroll-card-title">{service.title}</h3>
              <div className="scroll-card-inner">
                <div className="scroll-card-image-wrapper">
                  <img src={service.image} alt={service.title} className="scroll-card-image" />
                </div>
                <div className="scroll-card-content">
                  <p className="scroll-card-desc">{service.description}</p>
                  <button className="explore-btn">EXPLORE PROJECT &rarr;</button>
                </div>
              </div>
            </div>
          ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
