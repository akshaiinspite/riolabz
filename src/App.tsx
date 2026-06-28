import Hero from './components/Hero/Hero';
import RevealText from './components/RevealText/RevealText';
import Marquee from './components/Marquee/Marquee';
import WhatWeDo from './components/WhatWeDo/WhatWeDo';
import Showreel from './components/Showreel/Showreel';
import WhyChooseUs from './components/WhyChooseUs/WhyChooseUs';
import CTASection from './components/CTASection/CTASection';
import Footer from './components/Footer/Footer';
import './index.css';

function App() {
  return (
    <>
      <Hero />
      <Marquee />
      <RevealText />
      <Showreel />
      <WhatWeDo />
      <WhyChooseUs />
      <CTASection />
      <Footer />
    </>
  );
}

export default App;
