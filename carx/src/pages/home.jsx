import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CARS_DATA, stagger, fadeUp, InViewWrapper } from "../constants";

export default function HomePage({ setPage }) {
  const scrollRef = useRef(null);
  
 
  const [loading, setLoading] = useState(true);
  const [zoomActive, setZoomActive] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setZoomActive(true); 
      setTimeout(() => {
        setLoading(false); 
        document.body.style.overflow = "auto"; 
      }, 1000); 
    }, 800); 

    return () => clearTimeout(timer);
  }, []);

  const scrollCars = (dir) => {
    if (scrollRef.current) scrollRef.current.scrollLeft += dir * 420;
  };

  const specs = [
    { label: "AVAILABILITY", value: "12 UNITS", sub: "Reserved worldwide for immediate delivery." },
    { label: "AVERAGE HP", value: "840 BHP", sub: "Maximum output across the collection." },
    { label: "TOP SPEED", value: "340 KM/H", sub: "Engineered for unrestricted performance." },
    { label: "LOCATION", value: "MONACO", sub: "Global logistics center and showroom." },
  ];

  return (
    <div className="font-body bg-[#080808]" style={{ color: "#fff" }}>
      
     
      <AnimatePresence>
        {loading && (
          <motion.div
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "#040404",
              zIndex: 1000,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden"
            }}
          >
            <motion.div
              initial={{ scale: 1, opacity: 1 }}
              animate={zoomActive ? { scale: 80, opacity: 0 } : { scale: 1 }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
              style={{
                fontSize: "clamp(40px, 8vw, 80px)",
                fontWeight: "bold",
                letterSpacing: "0.4em",
                color: "#67F3F3",
                textShadow: "0 0 30px rgba(103,243,243,0.5)",
                textTransform: "uppercase"
              }}
            >
              CARX
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

     
      
      <section style={{ minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", padding:"120px 32px 60px", maxWidth:1280, margin:"0 auto" }}>
        <motion.div variants={stagger} initial="hidden" animate={!loading ? "show" : "hidden"}>
          <motion.div variants={fadeUp} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:32 }}>
            <div style={{ width:32, height:1, background:"#67F3F3" }} />
            <span className="font-body" style={{ color:"#67F3F3", fontSize:11, letterSpacing:"0.3em" }}>CURATED EXOTIC COLLECTION</span>
          </motion.div>
          <motion.h1 variants={fadeUp} className="font-display" style={{ fontSize:"clamp(72px,10vw,140px)", fontWeight:900, lineHeight:0.88, letterSpacing:"-0.02em", marginBottom:32, textTransform:"uppercase" }}>
            EXOTIC<br />
            <span style={{ color:"#67F3F3", textShadow: "0 0 30px rgba(103,243,243,0.3)" }}>COLLECTION</span>
          </motion.h1>
          <motion.p variants={fadeUp} style={{ color:"#888", maxWidth:420, lineHeight:1.7, fontSize:14, marginBottom:48 }}>
            A curated selection of the world's most aggressive engineering masterpieces. High-gloss finishes meet brutalist performance.
          </motion.p>
          <motion.div variants={fadeUp} style={{ display:"flex", gap:12, alignItems:"center" }}>
            <button 
              style={{ backgroundColor: "#A1F0D9", color: "#000", border: "none", padding: "15px 30px", fontWeight: "bold", cursor: "pointer" }}
              onClick={() => setPage("GARAGE")}
            >
              EXPLORE GARAGE →
            </button>
            <span style={{ color:"#555", fontSize:11, letterSpacing:"0.15em" }}>01 / 06</span>
            <div style={{ width:80, height:1, background:"rgba(255,255,255,0.15)" }} />
          </motion.div>
        </motion.div>
      </section>

      
      <section style={{ padding:"0 0 80px" }}>
        <div style={{ padding:"0 32px", maxWidth:1280, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
          <InViewWrapper><motion.h2 variants={fadeUp} style={{ fontSize:13, letterSpacing:"0.3em", color:"#555", textTransform: "uppercase" }}>Featured Vehicles</motion.h2></InViewWrapper>
          <div style={{ display:"flex", gap:8 }}>
            <button onClick={() => scrollCars(-1)} style={{ background: "none", border: "1px solid #333", color: "#fff", padding: "10px 15px", cursor: "pointer" }}>←</button>
            <button onClick={() => scrollCars(1)} style={{ background: "none", border: "1px solid #333", color: "#fff", padding: "10px 15px", cursor: "pointer" }}>→</button>
          </div>
        </div>
        
        <div ref={scrollRef} style={{ display:"flex", gap:20, padding:"10px 32px 20px", overflowX: "auto", scrollBehavior:"smooth", scrollbarWidth: "none" }}>
          {CARS_DATA.map((car, i) => (
            <motion.div key={car.id} initial={{ opacity:0, y:60 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.7, delay: i * 0.12 }} onClick={() => setPage("GARAGE")} style={{ minWidth:400, cursor:"pointer" }}>
              <div style={{ background: "#111", border: "1px solid #222" }}>
                <div style={{ height:220, overflow:"hidden", position:"relative" }}>
                  <img src={car.img} alt={car.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding:"20px 22px" }}>
                  <div style={{ color: "#67F3F3", fontSize: 10, fontWeight: "bold", letterSpacing: 2 }}>{car.brand}</div>
                  <div style={{ fontSize: 22, fontWeight: "bold", textTransform: "uppercase" }}>{car.name}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      
      <section style={{ padding:"0 32px 80px", maxWidth:1280, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
          {specs.map((s) => (
            <InViewWrapper key={s.label}>
              <motion.div variants={fadeUp} style={{ background: "#111", padding:"28px 24px", border: "1px solid #222" }}>
                <div style={{ color: "#67F3F3", fontSize: 10, letterSpacing: 2 }}>{s.label}</div>
                <div style={{ fontSize: 32, fontWeight: "bold", margin: "10px 0" }}>{s.value}</div>
                <div style={{ fontSize: 10, color: "#555" }}>{s.sub}</div>
              </motion.div>
            </InViewWrapper>
          ))}
        </div>
      </section>

  

      <footer style={{ padding: "60px 32px", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.05)", fontSize: 10, color: "#555", letterSpacing: 2 }}>
        © 2026 CARX HYPER GARAGE. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
}