import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const CARS_DATA = [
  {
    
    id: 1, name: "porsche 911 gt3 rs", brand: "PORSCHE", price: "$285,000", img: "pp.jpeg",
    subtitle: "The naturally aspirated legend",
     features: [
    "The 2009 Porsche 911 GT3 RS (997.2) is widely considered one of the last 'analog' supercars.",
    "Equipped with a high-revving 3.8-liter naturally aspirated engine.",
    "Features a manual gearbox for pure driving engagement.",
    "Iconic center-exit titanium exhaust producing a legendary sound.",
    "Produced in limited numbers between 2010 and 2011."
  ],
    specs: [
      { label: "Engine", value: "3.8L Flat-Six" },
      { label: "Power", value: "450 HP" },
      { label: "Top Speed", value: "310 KM/H" },
      { label: "0-100 KM/H", value: "3.9 Seconds" },
      { label: "Weight", value: "1,370 KG" },
      { label: "Transmission", value: "6-Speed Manual" }
    ]
  },
  {
    id: 2, name: "aventador svj", brand: "LAMBORGHINI", price: "$517,000", img: "lamp.jpeg",
    subtitle: "V12 Masterpiece",
    features: [
  "The ultimate manifestation of performance, designed to be the fastest naturally aspirated V12 production car.",
  "Features the innovative ALA 2.0 (Aerodinamica Lamborghini Attiva) active aerodynamics system.",
  "Re-engineered powertrain producing a staggering 770 HP, making it a true beast on the Nürburgring.",
  "A masterpiece of Italian engineering, combining extreme performance with breathtaking design.",
  "Features a lightweight 1,525 KG chassis optimized for track-focused agility and precision."
],
    specs: [
      { label: "Engine", value: "6.5L V12" },
      { label: "Power", value: "770 HP" },
      { label: "Top Speed", value: "350 KM/H" },
      { label: "0-100 KM/H", value: "2.8 Seconds" },
      { label: "Aero", value: "ALA 2.0 Active" },
      { label: "Weight", value: "1,525 KG" }
    ]
  },
  {
    id: 3, name: "chiron pur sport", brand: "BUGATTI", price: "$3,800,000", img: "chiron.jpeg",
    subtitle: "Agility in its purest form",
    features: [
  "Powered by an iconic 8.0-liter W16 quad-turbocharged engine producing 1,500 HP.",
  "Optimized for agility with shorter gear ratios for lightning-fast acceleration.",
  "Features a massive 1.9-meter fixed rear wing for extreme downforce.",
  "Lightweight magnesium wheels and titanium exhaust systems for weight reduction.",
  "Engineered for the ultimate lateral acceleration and precision handling on tracks."
],
    specs: [
      { label: "Engine", value: "8.0L W16 Quad-Turbo" },
      { label: "Power", value: "1,500 HP" },
      { label: "Top Speed", value: "350 KM/H" },
      { label: "0-100 KM/H", value: "2.3 Seconds" },
      { label: "Weight", value: "1,945 KG" },
      { label: "Torque", value: "1,600 NM" }
    ]
  },
  {
    
    id: 4, name: "BMW M4 Competition", brand: "BMW", price: "$300,000", img: "bmw.jpeg",
    subtitle: "The naturally aspirated legend",
    features: [
  "Equipped with a 3.0-liter M TwinPower Turbo inline 6-cylinder engine.",
  "Delivers 503 HP and 650 Nm of torque for a thrilling M performance experience.",
  "Advanced M xDrive system with 4WD, 4WD Sport, and pure 2WD modes.",
  "Precision-tuned M suspension and high-performance compound brakes.",
  "Bold design featuring the vertical kidney grille and carbon fiber roof."
],
    specs: [
  { label: "Engine", value: "3.0L Twin-Turbo I6" },
  { label: "Power", value: "503 HP" },
  { label: "Top Speed", value: "290 KM/H" },
  { label: "0-100 KM/H", value: "3.9 Seconds" },
  { label: "Weight", value: "1,725 KG" },
  { label: "Transmission", value: "8-Speed M Steptronic" }
]
  },
  {
    
    id: 5, name: "McLaren P1 Hybrid", brand: "mcLaren", price: "$456,000", img: "cc.jpeg",
    subtitle: "The naturally aspirated legend",
    features: [
  "A pioneering hybrid powertrain combining a twin-turbo V8 with a powerful electric motor.",
  "Total combined output of 903 HP with Formula 1 inspired IPAS technology.",
  "Advanced active aerodynamics with a rear wing that adjusts for DRS and airbrake.",
  "Ultra-lightweight carbon fiber MonoCage chassis for maximum rigidity.",
  "Produces over 600kg of downforce, providing incredible high-speed stability."
],
    specs: [
  { label: "Engine", value: "3.8L V8 Hybrid" },
  { label: "Power", value: "903 HP" },
  { label: "Top Speed", value: "350 KM/H" },
  { label: "0-100 KM/H", value: "2.8 Seconds" },
  { label: "Weight", value: "1,395 KG" },
  { label: "Transmission", value: "7-Speed Dual-Clutch" }
]
  }
];

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

export const fadeUp = { hidden: { opacity: 0, y: 35 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };
export const fadeIn = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.5 } } };
export const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };
export const slideLeft = { hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };
export const slideRight = { hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };
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