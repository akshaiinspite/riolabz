import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ScrollRevealText } from '../ScrollRevealText/ScrollRevealText';
import './WhatWeDo.css';

import imgCommercial from '../../assets/images/services/commercial_landscape.png';
import imgFilms from '../../assets/images/services/films_landscape.png';
import imgArvr from '../../assets/images/services/arvr_landscape.png';

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



const AnimatedScrollCard = ({ service, index, scrollYProgress }: { service: any, index: number, scrollYProgress: any }) => {
  const isFirst = index === 0;
  
  // Calculate precise entry windows for the horizontally scrolling cards
  let start = 0;
  let end = 0.2;
  if (index === 1) {
    start = 0.2;
    end = 0.6;
  } else if (index === 2) {
    start = 0.6;
    end = 1.0;
  }

  // The first card is already in view, so it doesn't need the drastic bottom-right entry.
  const scale = useTransform(scrollYProgress, [start, end], [isFirst ? 1 : 0.8, 1]);
  const y = useTransform(scrollYProgress, [start, end], [isFirst ? 0 : 150, 0]);
  const rotate = useTransform(scrollYProgress, [start, end], [isFirst ? 0 : 8, 0]);

  return (
    <motion.div 
      className="scroll-card"
      style={{ scale, y, rotate }}
    >
      <ScrollRevealText 
        text={service.title} 
        className="scroll-card-title" 
        elementType="h3" 
        globalProgress={scrollYProgress}
        globalRange={[start, end]}
        splitBy="character"
      />
      <div className="scroll-card-inner">
        <div className="scroll-card-image-wrapper">
          <img src={service.image} alt={service.title} className="scroll-card-image" />
        </div>
        <div className="scroll-card-content">
          <ScrollRevealText 
            text={service.description} 
            className="scroll-card-desc" 
            elementType="p" 
            globalProgress={scrollYProgress}
            globalRange={[start, end]}
            splitBy="word"
          />
          <button className="explore-btn">EXPLORE PROJECT &rarr;</button>
        </div>
      </div>
    </motion.div>
  );
};

const WhatWeDo = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 80%", "end end"]
  });

  const x = useTransform(scrollYProgress, [0.2, 1], ["0%", "-66.66%"]);

  return (
    <section className="what-we-do-wrapper" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
      
      <div className="section-title-wrapper" style={{ paddingTop: '8rem', paddingLeft: '4rem', paddingRight: '4rem', marginBottom: '4rem' }}>
        <ScrollRevealText text="What We Do" />
      </div>

      <div ref={targetRef} className="horizontal-scroll-container">
        <div className="sticky-scroll-wrapper">
          <motion.div style={{ x }} className="horizontal-scroll-track">
          {services.map((service, index) => (
            <AnimatedScrollCard 
              key={service.id} 
              service={service} 
              index={index} 
              scrollYProgress={scrollYProgress} 
            />
          ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
