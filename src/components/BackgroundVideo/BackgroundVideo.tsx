import './BackgroundVideo.css';
import bgVideo from '../../videos/hero/vr-2.min.mp4';

const BackgroundVideo = () => {
  return (
    <video className="bg-video" autoPlay loop muted playsInline>
      <source src={bgVideo} type="video/mp4" />
    </video>
  );
};

export default BackgroundVideo;
