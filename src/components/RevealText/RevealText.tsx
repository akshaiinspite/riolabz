import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './RevealText.css';

const lines = [
  "XALT is an independent",
  "digital studio crafting",
  "impactful experiences",
  "with VFX, CGI, and",
  "immersive technology."
];

const RevealText = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: textRef,
    // Start at 83% (slightly earlier than 80%)
    // Finish when bottom is at 55%
    offset: ["start 83%", "end 55%"] 
  });

  return (
    <section className="reveal-text-container">
      <div className="reveal-text-wrapper" ref={textRef}>
        <p className="reveal-text-paragraph">
          {lines.map((line, i) => {
            const start = i / lines.length;
            const end = start + (1 / lines.length);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);

            return (
              <span key={i} className="word-wrapper">
                <motion.span style={{ opacity }} className="reveal-word">
                  {line}
                </motion.span>
                {i < lines.length - 1 && " "}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
};

export default RevealText;
