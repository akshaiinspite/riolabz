import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import Hero from './components/Hero/Hero';
import RevealText from './components/RevealText/RevealText';
import Marquee from './components/Marquee/Marquee';
import WhatWeDo from './components/WhatWeDo/WhatWeDo';
import Showreel from './components/Showreel/Showreel';
import ThreeColumnGallery from './components/ThreeColumnGallery/ThreeColumnGallery';
import WhyChooseUs from './components/WhyChooseUs/WhyChooseUs';
import CTASection from './components/CTASection/CTASection';
import VideoGallery from './components/VideoGallery/VideoGallery';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Footer from './components/Footer/Footer';
import Loader from './components/Loader/Loader';
import CustomCursor from './components/CustomCursor/CustomCursor';
import './index.css';

function App() {
  const [isLoaderFinished, setIsLoaderFinished] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <Loader onFinish={() => setIsLoaderFinished(true)} />
      <Hero isLoaderFinished={isLoaderFinished} />
      <Marquee />
      <RevealText />
      <Showreel />
      <ThreeColumnGallery />
      <WhatWeDo />
      <WhyChooseUs />
      <VideoGallery />
      <ImageGallery />
      <CTASection />
      <Footer />
    </>
  );
}

export default App;
