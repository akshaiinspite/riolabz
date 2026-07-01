import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './ContactPage.css';

// ----------------------------------------------------
// SPECIALIZED WEBGL THREE.JS PLEXUS BACKGROUND
// ----------------------------------------------------
const ContactThreeBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Interactive plexus nodes
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;

      // Velocity
      velocities.push({
        x: (Math.random() - 0.5) * 0.012,
        y: (Math.random() - 0.5) * 0.012,
        z: (Math.random() - 0.5) * 0.012,
      });
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.06,
      color: 0xe10600,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // Morphing wireframe Icosahedron in the center
    const centerGeom = new THREE.IcosahedronGeometry(2, 1);
    const centerMat = new THREE.MeshBasicMaterial({
      color: 0xe10600,
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    });
    const centerMesh = new THREE.Mesh(centerGeom, centerMat);
    scene.add(centerMesh);

    // Mouse movement interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Slow drift particles
      const posArray = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3] += velocities[i].x;
        posArray[i * 3 + 1] += velocities[i].y;
        posArray[i * 3 + 2] += velocities[i].z;

        // Bounce off boundaries
        if (Math.abs(posArray[i * 3]) > 6) velocities[i].x *= -1;
        if (Math.abs(posArray[i * 3 + 1]) > 6) velocities[i].y *= -1;
        if (Math.abs(posArray[i * 3 + 2]) > 6) velocities[i].z *= -1;
      }
      geometry.attributes.position.needsUpdate = true;

      // Spin meshes
      centerMesh.rotation.y = elapsed * 0.05;
      centerMesh.rotation.x = elapsed * 0.02;
      particleSystem.rotation.y = elapsed * 0.01;

      // Parallax camera easing
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      camera.position.x = targetX * 2;
      camera.position.y = targetY * 2;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrameId);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      centerGeom.dispose();
      centerMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="contact-three-canvas" />;
};

// ----------------------------------------------------
// CONTACT PAGE COMPONENT
// ----------------------------------------------------
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    email: '',
    message: '',
  });

  const [activeField, setActiveField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleFocus = (fieldName: string) => {
    setActiveField(fieldName);
  };

  const handleBlur = () => {
    setActiveField(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
      return;
    }

    setIsSubmitting(true);
    // Simulate premium system submission & decryption scramble
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', contactNumber: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 4000);
    }, 2000);
  };

  return (
    <div className="contact-page">
      <ContactThreeBackground />

      {/* Surveillance Corner HUD Indicators */}
      <div className="surveillance-hud-overlay tl">
        <span className="rec-dot-pulse"></span>
        <span className="hud-mono-red">CAM_09 [PORTAL_ONLINE]</span>
        <span className="hud-divider">//</span>
        <span className="hud-mono-green">SYS_STATUS: CONNECTED</span>
      </div>

      <div className="surveillance-hud-overlay tr">
        <span className="hud-mono-gray">SECTOR: COMMUNICATION_LINE</span>
        <span className="hud-divider">//</span>
        <span className="hud-mono-red-blink">ENCRYPTION: AES_256</span>
      </div>

      <div className="contact-content-wrapper">
        <div className="contact-grid">
          
          {/* Left Column: Coordinates & Information details */}
          <div className="contact-info-panel">
            <div className="brand-accent-chevron-group">
              <span className="accent-chevron-red">&gt;&gt;</span>
              <span className="accent-badge-text">CONNECT WITH X.ALT</span>
            </div>

            <div className="cinematic-heading-group" style={{ marginBottom: '1.5rem' }}>
              <div className="about-hero-backdrop-text">GET IN TOUCH</div>
              <h1 className="about-hero-fore-title">GET IN TOUCH</h1>
            </div>

            <p className="contact-subtitle-text">
              Have a visionary project in mind or want to collaborate? Bridge the gap and send a secure transmission to our creative studio.
            </p>

            <div className="contact-info-cards">
              
              {/* Address Card */}
              <div className="info-card-item">
                <div className="info-card-header">
                  <span className="info-card-idx">[01]</span>
                  <span className="info-card-label">HEADQUARTERS LOCATION</span>
                </div>
                <div className="info-card-body">
                  <h4 className="info-card-title">X Alt Studios Pvt. Ltd</h4>
                  <p className="info-card-details">
                    2nd floor, Door no: 14/378 C, C1 A&A Arcade,<br />
                    Metro Nagar, Maradu, Kochi,<br />
                    Kerala 682304
                  </p>
                </div>
              </div>

              {/* Telephone Card */}
              <div className="info-card-item">
                <div className="info-card-header">
                  <span className="info-card-idx">[02]</span>
                  <span className="info-card-label">TELECOMMUNICATION</span>
                </div>
                <div className="info-card-body">
                  <a href="tel:+919633322321" className="info-card-link">
                    +91 96333 22321
                  </a>
                  <p className="info-card-meta">Mon - Sat // 09:00 - 18:00 IST</p>
                </div>
              </div>

              {/* Email Card */}
              <div className="info-card-item">
                <div className="info-card-header">
                  <span className="info-card-idx">[03]</span>
                  <span className="info-card-label">SECURE DATA CHANNELS</span>
                </div>
                <div className="info-card-body">
                  <a href="mailto:infos@xaltstudios.com" className="info-card-link">
                    infos@xaltstudios.com
                  </a>
                  <p className="info-card-meta">Direct Inquiries & Briefings</p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Cyber-HUD Contact Form */}
          <div className="contact-form-panel">
            <div className="cyber-form-wrapper">
              
              {/* HUD Frame Elements */}
              <div className="form-frame-corner tl"></div>
              <div className="form-frame-corner tr"></div>
              <div className="form-frame-corner bl"></div>
              <div className="form-frame-corner br"></div>
              
              <div className="form-header-bar">
                <span className="form-header-status">
                  {activeField ? `[TRANSMITTING: ${activeField.toUpperCase()}]` : '[SECURE TRANSMISSION NODE]'}
                </span>
                <span className="form-header-line"></span>
              </div>

              <form onSubmit={handleSubmit} className="cyber-form">
                
                {/* Name Input */}
                <div className={`form-group ${activeField === 'name' ? 'focused' : ''} ${formData.name ? 'has-value' : ''}`}>
                  <label className="form-label">
                    <span className="label-index">01.</span> FULL NAME <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={handleBlur}
                    placeholder="Enter your name"
                    className="form-input"
                    required
                  />
                  <div className="input-hud-status">
                    {activeField === 'name' ? 'RECORDING_INPUT' : formData.name ? 'VERIFIED' : 'AWAITING_INPUT'}
                  </div>
                </div>

                {/* Email Input */}
                <div className={`form-group ${activeField === 'email' ? 'focused' : ''} ${formData.email ? 'has-value' : ''}`}>
                  <label className="form-label">
                    <span className="label-index">02.</span> SECURE EMAIL ADDRESS <span className="req">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                    placeholder="name@company.com"
                    className="form-input"
                    required
                  />
                  <div className="input-hud-status">
                    {activeField === 'email' ? 'RECORDING_INPUT' : formData.email ? 'VERIFIED' : 'AWAITING_INPUT'}
                  </div>
                </div>

                {/* Contact Number Input */}
                <div className={`form-group ${activeField === 'contactNumber' ? 'focused' : ''} ${formData.contactNumber ? 'has-value' : ''}`}>
                  <label className="form-label">
                    <span className="label-index">03.</span> CONTACT NUMBER
                  </label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    onFocus={() => handleFocus('contactNumber')}
                    onBlur={handleBlur}
                    placeholder="+91 XXXXX XXXXX"
                    className="form-input"
                  />
                  <div className="input-hud-status">
                    {activeField === 'contactNumber' ? 'RECORDING_INPUT' : formData.contactNumber ? 'VERIFIED' : 'OPTIONAL'}
                  </div>
                </div>

                {/* Message Textarea */}
                <div className={`form-group ${activeField === 'message' ? 'focused' : ''} ${formData.message ? 'has-value' : ''}`}>
                  <label className="form-label">
                    <span className="label-index">04.</span> TRANSMISSION MESSAGE <span className="req">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus('message')}
                    onBlur={handleBlur}
                    placeholder="Describe your creative vision..."
                    className="form-input form-textarea"
                    rows={4}
                    required
                  />
                  <div className="input-hud-status">
                    {activeField === 'message' ? 'BUFFERING_STRING' : formData.message ? 'VERIFIED' : 'AWAITING_INPUT'}
                  </div>
                </div>

                {/* Submit Feedback Bar */}
                {submitStatus === 'success' && (
                  <div className="submit-message success">
                    <span>&gt;&gt; TRANSMISSION SECURED. WE WILL ESTABLISH CONNECTION SHORTLY.</span>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="submit-message error">
                    <span>&gt;&gt; ERROR: PLEASE FILL IN ALL REQUIRED FIELD CHANNELS.</span>
                  </div>
                )}

                {/* Submit button with GSAP magnetic-style custom feedback */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`form-submit-btn ${isSubmitting ? 'submitting' : ''}`}
                >
                  <span className="submit-btn-bg"></span>
                  <span className="submit-btn-text">
                    {isSubmitting ? 'ENCRYPTING & SENDING...' : 'INITIATE SECURE TRANSMISSION'}
                  </span>
                  <span className="submit-btn-arrow">&gt;&gt;</span>
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;
