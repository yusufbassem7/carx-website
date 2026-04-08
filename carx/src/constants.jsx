import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// ─── 1. بيانات المعرض ─────────────────────────────
export const CARS_DATA = [
  {
    id: 1, name: "Chiron Pur Sport", brand: "BUGATTI", type: "HYPERCAR", year: 2023,
    price: "$3,800,000", hp: 1500, topSpeed: "440 KM/H", weight: "1,995 KG",
    img: "chiron.jpg",
    fallback: "linear-gradient(135deg,#0a1628,#0d2a4a)",
    accent: "#8FF5FF", category: "hypercars",
    description: "The apex of Bugatti engineering. 16-cylinder quad-turbo masterpiece.",
  },
  {
    id: 2, name: "Aventador SVJ", brand: "LAMBORGHINI", type: "PERFORMANCE", year: 2022,
    price: "$517,000", hp: 770, topSpeed: "350 KM/H", weight: "1,525 KG",
    img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=900&q=80",
    fallback: "linear-gradient(135deg,#2a1a00,#4a2e00)",
    accent: "#F5A623", category: "hypercars",
    description: "Naturally aspirated V12 fury with active aerodynamics.",
  },
  {
    id: 3, name: "SF90 Stradale", brand: "FERRARI", type: "HYBRID", year: 2024,
    price: "$625,000", hp: 986, topSpeed: "340 KM/H", weight: "1,570 KG",
    img: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=900&q=80",
    fallback: "linear-gradient(135deg,#2a0000,#4a0000)",
    accent: "#FF3B30", category: "hypercars",
    description: "Ferrari's most powerful road car. Hybrid V8 with three electric motors.",
  }
];

// ─── 2. بيانات الجراج الخاص ────────────────────────
export const OWNED_CARS = [
  {
    id: 1, 
    name: "Chiron Pur Sport", 
    brand: "BUGATTI",
    img: "chiron.jpg",
    value: "$3,800,000", mileage: "1,240 KM", stage: 4,
    fallback: "linear-gradient(135deg,#0a1628,#0d2a4a)",
    folder: "bugatti animation", 
    prefix: "best_", 
    frameCount: 15, 
    stats: { engine: 92, aero: 88, tires: 76, brakes: 95, transmission: 89 },
  },
  {
    id: 2, 
    name: "porsche 991 gt3 rs", 
    brand: "PORSCHE",
    folder: "porsche animation",
    img: "porsche.jpg",
    value: "$517,000", mileage: "3,870 KM", stage: 3,
    fallback: "linear-gradient(135deg,#2a1a00,#4a2e00)",
    folder: "lambo_animation", 
    prefix: "frame_",
    frameCount: 100,
    stats: { engine: 78, aero: 82, tires: 60, brakes: 85, transmission: 91 },
  }
];

// ─── 3. حركات الأنيميشن (المطلوبة للـ Contact وغيرها) ───────
export const fadeUp = { hidden: { opacity: 0, y: 35 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };
export const fadeIn = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.5 } } };
export const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };

// الـ Exports اللي كانت ناقصة ومسببة الخطأ 👇
export const slideLeft = { hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };
export const slideRight = { hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };

// ─── 4. المكونات المشتركة ────────────────────────
export function InViewWrapper({ children }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>{children}</motion.div>;
}

export function ProgressBar({ value, label, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} style={{ marginBottom: "15px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom: "5px" }}>
        <span style={{ color:"var(--text-muted)", fontSize:"9px" }}>{label}</span>
        <span style={{ color:"var(--cyan)", fontSize:"11px", fontWeight: 700 }}>{value}%</span>
      </div>
      <div className="progress-bar-bg" style={{ height: "3px", background: "rgba(255,255,255,0.1)" }}>
        <div className="progress-bar-fill" style={{ width: inView ? `${value}%` : "0%", height: "100%", background: "var(--cyan)", transition: `width 1s ease ${delay}s` }} />
      </div>
    </div>
  );
}

export function StageDots({ stage }) {
  return (
    <div style={{ display:"flex", gap:4, alignItems: "center" }}>
      {[...Array(5)].map((_, i) => (
        <div key={i} style={{ width: i < stage ? 24 : 16, height: 4, borderRadius: 2, background: i < stage ? "var(--cyan)" : "rgba(255,255,255,0.1)", transition: "all 0.3s" }} />
      ))}
    </div>
  );
}