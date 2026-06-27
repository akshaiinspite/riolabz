import './BackgroundVideo.css';
import bgVideo from '../../videos/hero/vr-2.min.mp4';

const BackgroundVideo = () => {
  return (
    <div className="video-container">
      <video className="bg-video" autoPlay loop muted playsInline>
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div className="video-overlay"></div>
    </div>
  );
};

export default BackgroundVideo;
