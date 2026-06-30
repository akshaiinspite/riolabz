import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// Classic Components
import ClassicHero from './components/ClassicHero/ClassicHero';
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
      
      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
