import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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

const ScrollRevealText = ({ 
  text, 
  className = "section-title", 
  elementType: Component = "h2", 
  globalProgress, 
  globalRange,
  splitBy = "character"
}: { 
  text: string, 
  className?: string, 
  elementType?: any, 
  globalProgress?: any, 
  globalRange?: [number, number],
  splitBy?: "character" | "word"
}) => {
  const container = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 80%", "end 50%"]
  });

  const sourceProgress = globalProgress || scrollYProgress;
  const mappedProgress = useTransform(sourceProgress, globalRange || [0, 1], [0, 1]);

  const words = text.split(" ");
  return (
    <Component className={className} ref={container} style={{ display: 'flex', gap: '0.25em', flexWrap: 'wrap' }}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        
        if (splitBy === "word") {
          return <Char key={i} char={word} progress={mappedProgress} range={[start, end]} />;
        }
        
        return <Word key={i} word={word} progress={mappedProgress} range={[start, end]} />;
      })}
    </Component>
  );
};

const Word = ({ word, progress, range }: { word: string, progress: any, range: [number, number] }) => {
  const characters = word.split("");
  const amount = range[1] - range[0];
  const step = amount / characters.length;
  
  return (
    <span style={{ display: 'inline-flex' }}>
      {characters.map((char, i) => {
        const start = range[0] + (i * step);
        const end = range[0] + ((i + 1) * step);
        return <Char key={i} char={char} progress={progress} range={[start, end]} />
      })}
    </span>
  );
};

const Char = ({ char, progress, range }: { char: string, progress: any, range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0.1, 1]);
  return (
    <motion.span style={{ opacity }}>
      {char}
    </motion.span>
  );
};

const AnimatedScrollCard = ({ service, index, scrollYProgress }: { service: any, index: number, scrollYProgress: any }) => {
  const isFirst = index === 0;
  
  // Calculate precise entry windows for the horizontally scrolling cards
  let start = 0;
  let end = 0.2;
  if (index === 1) {
    start = 0.4;
    end = 0.6;
  } else if (index === 2) {
    start = 0.8;
    end = 1.0;
  }

  // The first card is already in view, so it doesn't need the drastic bottom-right entry.
  const scale = useTransform(scrollYProgress, [start, end], [isFirst ? 1 : 0.8, 1]);
  const y = useTransform(scrollYProgress, [start, end], [isFirst ? 0 : 150, 0]);
  const rotate = useTransform(scrollYProgress, [start, end], [isFirst ? 0 : 8, 0]);
  const opacity = useTransform(scrollYProgress, [start, end], [isFirst ? 1 : 0, 1]);

  return (
    <motion.div 
      className="scroll-card"
      style={{ scale, y, rotate, opacity }}
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
    offset: ["start 15%", "end end"]
  });

  const x = useTransform(scrollYProgress, [0.2, 1], ["0%", "-66.66%"]);

  return (
    <section className="what-we-do-wrapper" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      
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
