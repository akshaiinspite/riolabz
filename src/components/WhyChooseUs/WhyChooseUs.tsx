import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ScrollRevealText } from '../ScrollRevealText/ScrollRevealText';
import { AnimatedUnderline } from '../AnimatedUnderline/AnimatedUnderline';
import './WhyChooseUs.css';

const features = [
  {
    title: "Visionary Execution",
    desc: "We transform abstract concepts into hyper-realistic digital experiences that captivate and convert audiences worldwide.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.671zM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
      </svg>
    )
  },
  {
    title: "Global Network",
    desc: "Leveraging deep industry ties to bring world-class talent and proprietary technology to every single project.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    )
  },
  {
    title: "Immersive Storytelling",
    desc: "Crafting deeply engaging narratives that resonate with audiences through breathtaking cinematic visuals and sound design.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    )
  },
  {
    title: "Cutting-Edge Tech",
    desc: "Utilizing the absolute latest advancements in CGI, AI, and spatial computing to stay drastically ahead of the curve.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
      </svg>
    )
  },
  {
    title: "Uncompromising Quality",
    desc: "Every frame, every pixel, and every interaction is crafted with an obsessive attention to high-end detail.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    )
  },
  {
    title: "Agile Workflows",
    desc: "Seamlessly adapting to evolving project demands with optimized pipelines, ensuring rapid delivery without ever sacrificing excellence.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    )
  }
];

const PremiumCard = ({ feature }: { feature: typeof features[0] }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 90%", "center center"]
  });

  const rotateY = useTransform(scrollYProgress, [0, 1], [360, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  
  // Sweeps a specular shiny light across the card surface as it rotates
  const shineLeft = useTransform(scrollYProgress, [0, 1], ["-150%", "150%"]);

  return (
    <motion.div 
      ref={cardRef}
      className="premium-card"
      style={{ 
        opacity, 
        y, 
        rotateY,
        transformPerspective: 1200
      }}
    >
      {/* Shiny Light Reflection Layer */}
      <motion.div 
        style={{
          position: 'absolute',
          top: '-10%',
          left: shineLeft,
          width: '50%',
          height: '120%',
          background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)',
          transform: 'skewX(-25deg)',
          zIndex: 10,
          pointerEvents: 'none'
        }}
      />
      <div className="premium-card-border" />
      <div className="premium-card-content">
        <div className="premium-icon-wrapper">
          {feature.icon}
        </div>
        <ScrollRevealText 
          text={feature.title}
          className="premium-title"
          elementType="h3"
          globalProgress={scrollYProgress}
          globalRange={[0.6, 0.85]}
          splitBy="character"
        />
        <ScrollRevealText 
          text={feature.desc}
          className="premium-desc"
          elementType="p"
          globalProgress={scrollYProgress}
          globalRange={[0.75, 1.0]}
          splitBy="word"
        />
      </div>
    </motion.div>
  );
};

const WhyChooseUs = () => {
  return (
    <section className="why-choose-us-section">
      <div className="why-title-wrapper">
        <div style={{ display: 'inline-block' }}>
          <ScrollRevealText text="Why Choose Us" />
          <AnimatedUnderline color="#ff1a1a" />
        </div>
      </div>

      <div className="premium-grid">
        {features.map((feature, idx) => (
          <PremiumCard key={idx} feature={feature} />
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
