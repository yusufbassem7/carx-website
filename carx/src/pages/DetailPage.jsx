import React from 'react';
import { motion } from 'framer-motion';
import '../style.css';
export default function DetailPage({ car, setPage }) {
  if (!car) return null;

  return (
    <div className="detail-page bg-black text-white min-h-screen">
      <button 
        onClick={() => setPage('SHOWROOM')} 
        className="back-btn"
      >
        ← BACK TO SHOWROOM
      </button>
      <header className="detail-hero">
        <div className="container">
          <div className="detail-container">
            <div className="detail-image-wrapper">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="detail-square-box"
              >
                <img src={car.img} alt={car.name} />
              </motion.div>
            </div>

<div className="detail-content-wrapper">
  <p className="detail-subtitle">{car.subtitle}</p>
  <h1 className="detail-title">{car.name}</h1>
  
  <ul className="features-list">
    {car.features && car.features.map((point, index) => (
      <li key={index} className="feature-item">{point}</li>
    ))}
  </ul>
</div>
     </div>
</div>
</header>

      <section className="specs-section">
        <div className="container">
          <div className="specs-grid">
            {car.specs && car.specs.map((spec, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="spec-card"
              >
         
                <i className={`fas ${getIcon(spec.label)} spec-icon`}></i>
                <h4>{spec.label}</h4>
                <p>{spec.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="detail-cta-section">
        <div className="container">
          <p className="cta-title">READY TO DRIVE?</p>
          <button 
            className="btn-configure"
            onClick={() => setPage({ name: 'SCROLL_VIDEO', car: car })}
          >
            CONFIGURE MASTERPIECE
          </button>
        </div>
      </section>
    </div>
  );
}

function getIcon(label) {
  const l = label.toLowerCase();
  if (l.includes('engine')) return 'fa-microchip';
  if (l.includes('power')) return 'fa-bolt';
  if (l.includes('speed')) return 'fa-tachometer-alt';
  if (l.includes('0-100')) return 'fa-stopwatch';
  if (l.includes('weight')) return 'fa-weight-hanging';
  if (l.includes('transmission') || l.includes('gear')) return 'fa-cogs';
  return 'fa-info-circle';
}