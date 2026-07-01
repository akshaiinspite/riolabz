import { useEffect } from 'react';
import gsap from 'gsap';
import './ProjectsPage.css';

// Import images
import commercialHero from '../../assets/images/services/commercial_landscape.png';
import filmsHero from '../../assets/images/services/films_landscape.png';
import arvrHero from '../../assets/images/services/arvr_landscape.png';

import commercialVfx from '../../assets/images/gallery/commercial_vfx.png';
import cinematicPreviz from '../../assets/images/gallery/cinematic_previz.png';
import arVrFloat from '../../assets/images/gallery/ar_vr.png';

import designArtists from '../../assets/images/about/design_artists.png';
import studioWorkspace from '../../assets/images/about/studio_workspace.png';
import workstationVfx from '../../assets/images/img/workstation_vfx_studio.png';

import img1 from '../../assets/images/img/img-1.jpg';
import img2 from '../../assets/images/img/img-2.jpg';
import img3 from '../../assets/images/img/img-3.jpg';

interface SubCategory {
  title: string;
  description: string;
  image: string;
}

interface CategorySection {
  id: string;
  title: string;
  description: string;
  heroImage: string;
  floatImage1: string;
  floatImage2: string;
  subCategories: SubCategory[];
}

const CATEGORIES_DATA: CategorySection[] = [
  {
    id: 'commercial',
    title: 'COMMERCIAL PROJECTS',
    description: 'We create high-end commercial visual experiences for brands, corporations, real estate, hospitality, retail, and luxury businesses through cinematic storytelling and cutting-edge production.',
    heroImage: commercialHero,
    floatImage1: commercialVfx,
    floatImage2: workstationVfx,
    subCategories: [
      {
        title: 'Corporate Films',
        description: 'Brand introductions and company profile films.',
        image: img1,
      },
      {
        title: 'Product Photography',
        description: 'High-end ecommerce and lifestyle product shoots.',
        image: img2,
      },
      {
        title: 'Architectural Visualization',
        description: 'Cinematic interior and exterior property renders.',
        image: studioWorkspace,
      },
      {
        title: 'Real Estate Media',
        description: 'Drone coverage, HDR visuals and virtual tours.',
        image: img3,
      },
      {
        title: 'Advertising Campaigns',
        description: 'Vibrant digital ads and social media commercial films.',
        image: designArtists,
      },
    ],
  },
  {
    id: 'films',
    title: 'FILMS & ENTERTAINMENT',
    description: 'Bringing stories to life with cinematic production, visual effects, immersive editing, and professional filmmaking.',
    heroImage: filmsHero,
    floatImage1: cinematicPreviz,
    floatImage2: designArtists,
    subCategories: [
      {
        title: 'Film Production',
        description: 'Short films, documentaries, and cinematic storytelling.',
        image: img2,
      },
      {
        title: 'Music Videos',
        description: 'High-end artistic videos and artist brand visuals.',
        image: img3,
      },
      {
        title: 'VFX & CGI',
        description: 'Immersive visual effects and realistic 3D environments.',
        image: commercialVfx,
      },
      {
        title: 'Post Production',
        description: 'Professional color grading, sound design and editing.',
        image: workstationVfx,
      },
      {
        title: 'Content Creation',
        description: 'YouTube shows, OTT releases and visual podcasts.',
        image: img1,
      },
    ],
  },
  {
    id: 'immersive',
    title: 'AR & VR EXPERIENCES',
    description: 'Creating interactive digital experiences using Augmented Reality, Virtual Reality, Mixed Reality, and immersive technologies.',
    heroImage: arvrHero,
    floatImage1: arVrFloat,
    floatImage2: studioWorkspace,
    subCategories: [
      {
        title: 'Augmented Reality',
        description: 'Interactive AR showcases and packaging enhancements.',
        image: img3,
      },
      {
        title: 'Virtual Reality',
        description: 'Immersive VR virtual walkthroughs and simulation training.',
        image: arVrFloat,
      },
      {
        title: 'Mixed Reality',
        description: 'Hybrid presentations and next-gen enterprise tools.',
        image: img1,
      },
      {
        title: 'Metaverse Solutions',
        description: 'Digital avatars and real-time virtual events spaces.',
        image: img2,
      },
      {
        title: 'Interactive Installations',
        description: 'Exhibition displays, museum panels, and event activations.',
        image: studioWorkspace,
      },
    ],
  },
];

const ProjectsPage = () => {
  useEffect(() => {
    // Reveal animations using GSAP
    const sections = gsap.utils.toArray('.projects-category-section');
    sections.forEach((sec: any) => {
      gsap.fromTo(
        sec.querySelector('.projects-hero-left'),
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: sec,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        sec.querySelector('.projects-hero-right'),
        { opacity: 0, scale: 0.95, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.4,
          scrollTrigger: {
            trigger: sec,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => {
      // Clean up scroll triggers
    };
  }, []);

  return (
    <div className="projects-page">
      {CATEGORIES_DATA.map((cat, idx) => (
        <section key={cat.id} className="projects-category-section">
          {/* Symmetrical Red background geometric decoration panels */}
          <div className="red-geometric-bg">
            <div className="geom-line line-1"></div>
            <div className="geom-line line-2"></div>
            <div className="geom-shape shape-polygon"></div>
          </div>

          <div className="projects-category-container">
            {/* Category Hero Block */}
            <div className="projects-hero-grid">
              
              {/* Left Side Info */}
              <div className="projects-hero-left">
                <div className="projects-accent-chevron-group">
                  <span className="accent-chevron-black">&gt;&gt;</span>
                  <span className="accent-badge-text-black">CATEGORY {idx + 1}</span>
                </div>
                
                <h1 className="projects-category-heading">{cat.title}</h1>
                <p className="projects-category-desc">{cat.description}</p>
                
                <button className="projects-cta-btn">
                  <span>INITIATE OVERVIEW</span>
                  <span className="projects-cta-arrow">&gt;&gt;</span>
                </button>
              </div>

              {/* Right Side Floating Image Composition */}
              <div className="projects-hero-right">
                <div className="projects-hero-image-wrapper">
                  <img src={cat.heroImage} alt={cat.title} className="projects-main-hero-img" />
                  <div className="glass-hud-panel">
                    <span className="hud-label">[FEATURED COMPOSITION]</span>
                    <span className="hud-value">REF_SEC_0{idx + 1}</span>
                  </div>
                </div>

                {/* Overlapping Floating Images */}
                <div className="projects-floating-img img-float-1">
                  <img src={cat.floatImage1} alt="Floating angle 1" />
                </div>
                <div className="projects-floating-img img-float-2">
                  <img src={cat.floatImage2} alt="Floating angle 2" />
                </div>
              </div>

            </div>

            {/* Sub-categories horizontal continuous marquee row */}
            <div className="projects-marquee-container">
              <div className="projects-marquee-header">
                <span className="marquee-header-label">SUB-SERVICES // DECRYPTED_NODES</span>
                <span className="marquee-header-line"></span>
              </div>

              <div className="projects-marquee-track-wrapper">
                <div className="projects-marquee-track">
                  {/* Render the sub-categories list twice to support continuous looping marquee */}
                  {[...cat.subCategories, ...cat.subCategories].map((sub, sIdx) => (
                    <div key={sIdx} className="projects-subcard">
                      <div className="projects-subcard-img-wrapper">
                        <img src={sub.image} alt={sub.title} className="projects-subcard-img" />
                        <div className="projects-subcard-overlay"></div>
                      </div>

                      <div className="projects-subcard-info">
                        <h4 className="projects-subcard-title">{sub.title}</h4>
                        <p className="projects-subcard-desc">{sub.description}</p>
                        <span className="projects-subcard-accent-line"></span>
                        <button className="projects-subcard-learn-btn">
                          <span>LEARN MORE</span>
                          <span className="btn-arrow">&gt;&gt;</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>
      ))}
    </div>
  );
};

export default ProjectsPage;
