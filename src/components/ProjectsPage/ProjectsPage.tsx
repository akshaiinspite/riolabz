import { useEffect, useState } from 'react';
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

import logoImg from '../../assets/images/logo/xalt-studios-logo.webp';

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
        title: 'Movie Previz',
        description: 'Pre-visualization and structural blockouts.',
        image: img1,
      },
      {
        title: 'Motion Poster',
        description: 'Dynamic animated poster designs.',
        image: img2,
      },
      {
        title: 'CGI & VFX',
        description: 'Immersive visual effects and realistic 3D environments.',
        image: commercialVfx,
      },
      {
        title: 'Lyrical Video',
        description: 'Aesthetic wordplay and audio-reactive animations.',
        image: img3,
      },
      {
        title: 'Title Animation',
        description: 'High-impact title cards and credits sequencings.',
        image: filmsHero,
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
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState<number>(1); // Default: Films & Entertainment
  const [selectedSubcategoryIdx, setSelectedSubcategoryIdx] = useState<number>(2); // Default: CGI & VFX
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const handleSelect = (categoryIdx: number, subcategoryIdx: number) => {
    setSelectedCategoryIdx(categoryIdx);
    setSelectedSubcategoryIdx(subcategoryIdx);
    setActiveDropdown(null);
  };

  const handleCategorySelect = (categoryIdx: number) => {
    setSelectedCategoryIdx(categoryIdx);
    setSelectedSubcategoryIdx(0); // Default to the first subcategory
    setActiveDropdown(null);
  };

  // Synchronize selected category with URL hash
  useEffect(() => {
    const handleHashCheck = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#projects/commercial')) {
        setSelectedCategoryIdx(0);
        setSelectedSubcategoryIdx(0);
      } else if (hash.startsWith('#projects/films')) {
        setSelectedCategoryIdx(1);
        setSelectedSubcategoryIdx(2); // default to CGI & VFX
      } else if (hash.startsWith('#projects/immersive')) {
        setSelectedCategoryIdx(2);
        setSelectedSubcategoryIdx(0);
      }
    };

    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);
    return () => {
      window.removeEventListener('hashchange', handleHashCheck);
    };
  }, []);

  useEffect(() => {
    // Initial GSAP reveal animations for content board
    gsap.fromTo(
      '.board-header',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
    gsap.fromTo(
      '.board-subcard',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.1 }
    );
  }, [selectedCategoryIdx]);

  useEffect(() => {
    // Trigger slide-up animation for the gallery when subcategory changes
    if (selectedSubcategoryIdx !== null) {
      gsap.fromTo(
        '.board-gallery-container',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, [selectedSubcategoryIdx]);

  const renderHighlightedTitle = (title: string) => {
    const words = title.split(' ');
    if (words.length <= 1) return title;
    
    if (title.includes('&')) {
      const parts = title.split('&');
      return (
        <>
          {parts[0]} & <span className="board-title-highlight">{parts[1].trim()}</span>
        </>
      );
    }
    
    const lastWord = words[words.length - 1];
    const firstPart = words.slice(0, -1).join(' ');
    return (
      <>
        {firstPart} <span className="board-title-highlight">{lastWord}</span>
      </>
    );
  };

  const activeCategory = CATEGORIES_DATA[selectedCategoryIdx];

  return (
    <div className="projects-page-new">
      
      {/* TOP DROPDOWN NAVIGATION BAR */}
      <div className="projects-nav-bar">
        <div className="nav-logo-area" onClick={() => window.location.hash = '#home'}>
          <img src={logoImg} alt="Xalt Studio" className="projects-nav-logo" />
        </div>

        <div className="projects-dropdowns-group">
          {CATEGORIES_DATA.map((cat, idx) => (
            <div 
              key={cat.id}
              className={`proj-dropdown-wrapper ${activeDropdown === idx ? 'expanded' : ''}`}
              onMouseEnter={() => setActiveDropdown(idx)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                className={`proj-dropdown-trigger ${selectedCategoryIdx === idx ? 'active' : ''}`}
                onClick={() => handleCategorySelect(idx)}
              >
                <span>{cat.title}</span>
                <span className="dropdown-caret">▼</span>
              </button>
              <div className="proj-dropdown-menu">
                {cat.subCategories.map((sub, sIdx) => (
                  <div 
                    key={sIdx} 
                    className={`proj-dropdown-item ${selectedCategoryIdx === idx && selectedSubcategoryIdx === sIdx ? 'selected' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(idx, sIdx);
                    }}
                  >
                    {sub.title}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="projects-board-section">
        <div className="board-header">
          <div className="board-meta">
            <span className="rec-blink-dot"></span>
            <span className="board-tag">// SYSTEM: EVIDENCE_BOARD</span>
            <span className="board-status">SECTOR: ACTIVE</span>
          </div>
          <h2 className="board-category-title">
            {renderHighlightedTitle(activeCategory.title)}
          </h2>
          <div className="board-desc-box">
            <span className="board-desc-line"></span>
            <p className="board-category-desc">{activeCategory.description}</p>
          </div>
        </div>

        {/* SUBCATEGORY CARDS BOARD (White vertical cards with desaturated images) */}
        <div className="board-cards-grid">
          {activeCategory.subCategories.map((sub, sIdx) => {
            const isSelected = selectedSubcategoryIdx === sIdx;
            return (
              <div 
                key={sIdx} 
                className={`board-subcard ${isSelected ? 'active-card' : ''}`}
                onClick={() => setSelectedSubcategoryIdx(sIdx)}
              >
                <div className="board-subcard-header">
                  <span className="board-subcard-title">{sub.title}</span>
                </div>
                
                <div className="board-subcard-img-container">
                  <img src={sub.image} alt={sub.title} className="board-subcard-img" />
                  <div className="board-subcard-filter"></div>
                </div>

                <div className="board-subcard-indicator">
                  <span>{isSelected ? '>> ACTIVE NODE' : '>> CLICK TO DECRYPT'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DETAILED SUB-CATEGORY GALLERY SECTION */}
      {selectedSubcategoryIdx !== null && activeCategory.subCategories[selectedSubcategoryIdx] && (
        <div 
          className="board-gallery-panel"
          style={{ backgroundImage: `url(${activeCategory.subCategories[selectedSubcategoryIdx].image})` }}
        >
          <div className="board-gallery-backdrop-blur"></div>
          <div className="board-gallery-vignette"></div>

          <div className="board-gallery-container">
            <div className="gallery-header">
              <div className="gallery-logo-tag">
                <span className="accent-chevron-red">&gt;&gt;</span>
                <span className="gallery-mono-text">DECRYPTED_NODE // {activeCategory.subCategories[selectedSubcategoryIdx].title.toUpperCase()}</span>
              </div>
              <h3 className="gallery-title">{activeCategory.subCategories[selectedSubcategoryIdx].title}</h3>
              <p className="gallery-desc">
                {activeCategory.subCategories[selectedSubcategoryIdx].description || 'High-end cinema blockout and environmental rendering processes tailored for standard and creative production demands.'}
              </p>
            </div>

            {/* Grid of Empty Red Rounded Rectangles */}
            <div className="gallery-empty-grid">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="gallery-empty-slot">
                  <div className="slot-corner tl"></div>
                  <div className="slot-corner tr"></div>
                  <div className="slot-corner bl"></div>
                  <div className="slot-corner br"></div>
                  <div className="slot-radar-sweep"></div>
                  <div className="slot-label">INDEX_SLOT_0{i + 1}</div>
                  <div className="slot-coordinate">GRID_COORD_{12 + i * 8}_X</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProjectsPage;
