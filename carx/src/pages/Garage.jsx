import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProgressBar, StageDots } from "../constants"; 


const OWNED_CARS = [
  {
    id: 1,
    name: "Chiron Pur Sport",
    brand: "BUGATTI",
    
    prefix: "best_",
    totalFrames: 239,
    img: "/chiron.jpg",
    stage: 4,
    color: "#8ff5ff",
    folder: "bugatti",
    stats: { engine: 92, aero: 88, tires: 76, brakes: 95, transmission: 89 }
  },
  {
    id: 2,
    name: "911 GT3 RS",
    brand: "PORSCHE",
    img: "/porsche.jpg",
    stage: 3,
    color: "#ff3e3e",
    folder: "porsche animation",
    prefix: "porsche animation_",
    stage: 3,
    stats: { engine: 78, aero: 82, tires: 60, brakes: 85, transmission: 91 }
  },
  {
    id: 3,
    name: "BMW M4 Competition",
    brand: "BMW",
    img: "/bmw.jpg",
    stage: 2,
    color: "#335FFF",
    folder: "bmw animation",
    prefix: "bmw_",
    totalFrames: 232,
    stats: { engine: 82, aero: 75, tires: 70, brakes: 88, transmission: 85 }
  },
  {
    id: 4,
    name: "Aventador SVJ",
    brand: "LAMBORGHINI",
    img: "/lamp.jpg",
    stage: 4,
    color: "#c5ff00",
    folder: "lamp animation",
    prefix: "lamp_",
    totalFrames: 239,
    stats: { engine: 96, aero: 94, tires: 85, brakes: 92, transmission: 90 }
  },
  {
    id: 5,
    name: "McLaren P1 Hybrid",
    brand: "McLAREN",
    img: "/mcalren.jpg",
    stage: 5,
    totalFrames: 232,
    color: "#ff8c00",
    folder: "mclaren animation",
    prefix: "mclaren_",
    stats: { engine: 98, aero: 98, tires: 80, brakes: 95, transmission: 94 }
  }
];

export default function GaragePage({ setPage }) {
  const [activeCarId, setActiveCarId] = useState(1);
  const activeCar = OWNED_CARS.find(c => c.id === activeCarId);

  return (
    <div style={{ paddingTop: 100, paddingInline: 32, minHeight: "100vh", backgroundColor: "#050505", color: "white" }}>
      <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 30, maxWidth: 1400, margin: "0 auto" }}>
        
      
        <div 
          style={{ display: "flex", flexDirection: "column", gap: 15, maxHeight: "80vh", overflowY: "auto", paddingRight: 10 }} 
          className="custom-scrollbar"
        >
          {OWNED_CARS.map(car => (
            <motion.div 
              key={car.id} 
              whileHover={{ scale: 1.02 }}
              onClick={() => setActiveCarId(car.id)} 
              className="glass-card" 
              style={{ 
                cursor: "pointer", 
                transition: "0.3s",
                border: activeCarId === car.id ? `1px solid ${car.color}` : "1px solid rgba(255,255,255,0.05)",
                position: "relative",
                overflow: "hidden",
                backgroundColor: activeCarId === car.id ? "rgba(255,255,255,0.02)" : "transparent"
              }}
            >
              <img 
                src={car.img} 
                style={{ width: "100%", height: 100, objectFit: "cover", opacity: activeCarId === car.id ? 1 : 0.4 }} 
                alt={car.name}
              />
              <div style={{ padding: 12, fontSize: 11, fontWeight: "900", textTransform: "uppercase", letterSpacing: 1 }}>
                {car.name}
              </div>
              
         
              {activeCarId === car.id && (
                <motion.div 
                  layoutId="indicator"
                  style={{ 
                    position: "absolute", 
                    left: 0, 
                    top: 0, 
                    bottom: 0, 
                    width: 4, 
                    backgroundColor: car.color, 
                    boxShadow: `0 0 15px ${car.color}` 
                  }} 
                />
              )}
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCar.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="glass-card" 
            style={{ 
              padding: 50, 
              background: `linear-gradient(145deg, rgba(20,20,20,1) 0%, rgba(5,5,5,1) 100%)`,
              border: "1px solid rgba(255,255,255,0.03)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div>
                <p style={{ color: activeCar.color, fontSize: 10, letterSpacing: 5, textTransform: "uppercase", marginBottom: 10, fontWeight: "bold" }}>
                  {activeCar.brand} // PERFORMANCE
                </p>
                <h1 className="font-display" style={{ fontSize: 60, textTransform: "uppercase", margin: 0, letterSpacing: -3, fontWeight: "900" }}>
                  {activeCar.name}
                </h1>
              </div>
              <button 
                className="btn-primary" 
                style={{ 
                  padding: "18px 45px", 
                  fontSize: 11, 
                  fontWeight: "900", 
                  borderRadius: 50,
                  backgroundColor: "transparent",
                  border: `1px solid ${activeCar.color}`,
                  color: activeCar.color,
                  cursor: "pointer",
                  letterSpacing: 2
                }}
                onClick={() => setPage({ name: "SCROLL_VIDEO", car: activeCar })}
              >
                SHOW 360° VIEW →
              </button>
            </div>
            
           
            <div style={{ marginTop: 50, display: "flex", flexDirection: "column", gap: 30 }}>
              {Object.entries(activeCar.stats).map(([label, val], i) => (
                <ProgressBar 
                  key={activeCar.id + label} 
                  label={label.toUpperCase()} 
                  value={val} 
                  delay={i * 0.1}
                  color={activeCar.color} 
                />
              ))}
            </div>

           
            <div style={{ marginTop: 50, paddingTop: 30, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <p style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: 2 }}>Modification Stage</p>
                <p style={{ fontSize: 10, color: activeCar.color, fontWeight: "bold" }}>LEVEL 0{activeCar.stage}</p>
              </div>
              <StageDots stage={activeCar.stage} color={activeCar.color} />
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}