import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// Classic Components
import ClassicHero from './components/ClassicHero/ClassicHero';
import OurStory from './components/OurStory/OurStory';
import ProjectsSection from './components/ProjectsSection/ProjectsSection';
import Marquee from './components/Marquee/Marquee';
import Showreel from './components/Showreel/Showreel';
import CTASection from './components/CTASection/CTASection';
import Footer from './components/Footer/Footer';
import './index.css';

function App() {
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
      {/* 1. Classic minimal hero with X logo */}
      <ClassicHero />
      
      {/* 2. Our Story Section */}
      <OurStory />
      
      {/* 3. Projects Section */}
      <ProjectsSection />
      
      {/* 4. Marquee */}
      <Marquee />
      
      {/* 5. Showreel */}
      <Showreel />

      {/* 6. CTA Section */}
      <CTASection />
      
      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
