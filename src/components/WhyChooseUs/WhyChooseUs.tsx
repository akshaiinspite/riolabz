import './WhyChooseUs.css';

const whyData = [
  {
    id: 1,
    title: 'Personalized Support',
    description: 'Work with dedicated consultants who understand your business goals and unique vision.'
  },
  {
    id: 2,
    title: 'With You Every Step',
    description: 'We stay with you from the first consultation to post-launch, ensuring a seamless experience.'
  },
  {
    id: 3,
    title: 'Unmatched Quality',
    description: 'We push the boundaries of XR and VFX to deliver premium, industry-leading visual experiences.'
  },
  {
    id: 4,
    title: 'Technical Mastery',
    description: 'Our team perfectly bridges the gap between traditional storytelling and digital production.'
  }
];

const renderVisual = (id: number) => {
  switch (id) {
    case 1:
      return (
        <div className="visual-avatars">
          <div className="avatar a1"></div>
          <div className="avatar a2"></div>
          <div className="avatar a3"></div>
          <div className="avatar a4"></div>
        </div>
      );
    case 2:
      return (
        <div className="visual-chat">
          <div className="chat-bubble left">Your design draft is ready.</div>
          <div className="chat-bubble right">Looks perfect!</div>
        </div>
      );
    case 3:
      return (
        <div className="visual-nodes">
          <svg className="node-lines" viewBox="0 0 120 120">
            <line x1="60" y1="60" x2="60" y2="15" />
            <line x1="60" y1="60" x2="20" y2="40" />
            <line x1="60" y1="60" x2="100" y2="40" />
            <line x1="60" y1="60" x2="20" y2="80" />
            <line x1="60" y1="60" x2="100" y2="80" />
            <line x1="60" y1="60" x2="60" y2="105" />
          </svg>
          <div className="node center"></div>
          <div className="node n1"></div>
          <div className="node n2"></div>
          <div className="node n3"></div>
          <div className="node n4"></div>
          <div className="node n5"></div>
          <div className="node n6"></div>
        </div>
      );
    case 4:
      return (
        <div className="visual-timeline">
          <div className="time-col">
            <div className="time-lbl">Brief</div>
            <div className="time-block b1"></div>
          </div>
          <div className="time-col">
            <div className="time-lbl">Design</div>
            <div className="time-block b2"></div>
          </div>
          <div className="time-col">
            <div className="time-lbl">Review</div>
            <div className="time-block b3"></div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

const WhyChooseUs = () => {
  return (
    <section className="why-section">
      <div className="why-container">
        <div className="why-header">
          <h2>Why Choose Us</h2>
        </div>
        
        <div className="why-grid">
          {whyData.map((item) => (
            <div key={item.id} className="why-card">
              <div className="why-card-visual">
                {renderVisual(item.id)}
              </div>
              <div className="why-card-text">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
