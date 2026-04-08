import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CARS_DATA, stagger, fadeUp, InViewWrapper } from "../constants";

export default function ShowroomPage() {
  const [filter, setFilter] = useState("all");
  const filters = ["ALL","HYPERCARS","CLASSICS"];

  const filtered = CARS_DATA.filter(c => {
    if (filter === "all") return true;
    return c.category === filter.toLowerCase();
  });

  return (
    <div className="font-body" style={{ paddingTop:70 }}>
      {/* Hero Section (Same as original) */}
      <section className="showroom-hero">
        <div className="showroom-bg-overlay" />
        <motion.div variants={stagger} initial="hidden" animate="show" className="showroom-hero-content">
          <motion.div variants={fadeUp} className="showroom-label">CURATED COLLECTION</motion.div>
          <motion.h1 variants={fadeUp} className="font-display cyan-glow showroom-title">THE SHOWROOM</motion.h1>
          <motion.p variants={fadeUp} className="showroom-desc">Every vehicle engineered beyond the ordinary. Select your obsession.</motion.p>
        </motion.div>
      </section>

      {/* Filter Tabs */}
      <div className="filter-container">
        <div className="filter-tabs">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f === "ALL" ? "all" : f)} 
              className={`filter-btn ${filter === (f === "ALL" ? "all" : f) ? 'active' : ''}`}>{f}</button>
          ))}
        </div>
      </div>

      {/* Car Grid */}
      <div className="showroom-grid-container">
        <AnimatePresence mode="wait">
          <motion.div key={filter} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="showroom-grid">
            {filtered.map((car, i) => (
              <motion.div key={car.id} initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ delay: i * 0.08 }}>
                <div className="glass-card showroom-card">
                   {/* Card content same as original */}
                   <div className="card-img-wrapper">
                      <img src={car.img} alt={car.name} />
                      <div className="tag-container">
                        <span className="tag tag-cyan">{car.type}</span>
                        <span className="tag tag-gold">{car.year}</span>
                      </div>
                   </div>
                   <div className="card-info">
                      <div className="brand">{car.brand}</div>
                      <div className="font-display name">{car.name}</div>
                      <div className="desc">{car.description}</div>
                      <div className="mini-stats">
                        <div className="stat-box"><span>{car.hp}</span><label>BHP</label></div>
                        <div className="stat-box"><span>{car.topSpeed.split(" ")[0]}</span><label>TOP</label></div>
                        <div className="stat-box"><span>{car.weight.split(" ")[0]}</span><label>KG</label></div>
                      </div>
                      <div className="card-footer">
                        <div className="price-box"><label>PRICING FROM</label><span>{car.price}</span></div>
                        <button className="btn-primary">VIEW DETAILS →</button>
                      </div>
                   </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}