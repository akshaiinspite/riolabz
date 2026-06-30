import './ProjectsSection.css';
import img1 from '../../assets/images/img/img-1.jpg';
import img2 from '../../assets/images/img/img-2.jpg';
import img3 from '../../assets/images/img/img-3.jpg';

const projectsData = [
  {
    id: 1,
    title: 'AR & VR EXPERIENCES',
    tags: ['Virtual Reality', 'Augmented Reality', 'Metaverse', 'WebXR', 'Interactive 3D'],
    image: img1
  },
  {
    id: 2,
    title: 'FILMS & ENTERTAINMENT',
    tags: ['VFX', 'Compositing', 'CGI', 'Motion Capture', 'Post-Production'],
    image: img2
  },
  {
    id: 3,
    title: 'COMMERCIAL PROJECTS',
    tags: ['Motion Design', 'Brand Campaign', 'Product Launch', 'Digital OOH', '3D Animation'],
    image: img3
  }
];

const ProjectsSection = () => {
  return (
    <section className="projects-section">
      <div className="projects-container">
        <div className="projects-header">
          <h2>What we do</h2>
        </div>
        
        {projectsData.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-content">
              <h3>{project.title}</h3>
              <div className="project-tags">
                {project.tags.map((tag, index) => (
                  <span key={index} className="project-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="project-image-wrapper">
              <img src={project.image} alt={project.title} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
