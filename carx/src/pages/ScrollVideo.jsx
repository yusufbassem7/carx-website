import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollVideoPage({ carData, setPage }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const totalFrames = carData.totalFrames || 238;

  const getFrameUrl = (index) => {
    const folder = carData.folder || "porsche animation";
    const prefix = carData.prefix || "porsche animation_";
    const fileName = `${prefix}${index.toString().padStart(3, '0')}.jpg`;
    return encodeURI(`/${folder}/${fileName}`);
  };

  useEffect(() => {
    let loadedCount = 0;
    const loadedImages = [];

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
        if (loadedCount === totalFrames) {
          setIsLoaded(true);
        }
      };

      img.onerror = () => {
        loadedCount++; 
        if (loadedCount === totalFrames) setIsLoaded(true);
      };

      loadedImages.push(img);
    }
    setImages(loadedImages);

    return () => {
      setImages([]);
      setIsLoaded(false);
    };
  }, [carData]);

  useGSAP(() => {
    if (!isLoaded || images.length === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const sequence = { frame: 0 };

    const render = () => {
      const img = images[sequence.frame];
      if (!img) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const imgRatio = img.width / img.height;
      const canvasRatio = canvas.width / canvas.height;
      
      let dW, dH, oX, oY;
 
      const scaleFactor = 0.9; 

      if (imgRatio > canvasRatio) {
        dW = canvas.width * scaleFactor;
        dH = dW / imgRatio;
      } else {
        dH = canvas.height * scaleFactor;
        dW = dH * imgRatio;
      }
      oX = (canvas.width - dW) / 2;
      oY = (canvas.height - dH) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, oX, oY, dW, dH);
    };

    gsap.to(sequence, {
      frame: totalFrames - 1,
      snap: "frame",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=2500", 
        scrub: 0.5,    
        pin: true,
        onUpdate: render,
      },
    });

    render();
    window.addEventListener("resize", render);
    return () => window.removeEventListener("resize", render);
  }, [isLoaded, images]);

  return (
    <div ref={containerRef} style={{ backgroundColor: "#000", minHeight: "100vh" }}>
      
      {!isLoaded && (
        <div style={{ 
          position: "fixed", inset: 0, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", zIndex: 200, backgroundColor: "#000" 
        }}>
          <h2 style={{ color: carData.color || "#fff", letterSpacing: 10, fontSize: 12, marginBottom: 20 }}>
            IGNITING ENGINE
          </h2>
          <div style={{ width: 200, height: 2, backgroundColor: "rgba(255,255,255,0.1)", position: "relative" }}>
            <div style={{ 
              position: "absolute", left: 0, top: 0, height: "100%", 
              width: `${loadProgress}%`, backgroundColor: carData.color || "#fff",
              boxShadow: `0 0 15px ${carData.color}`
            }} />
          </div>
          <p style={{ marginTop: 10, fontSize: 10, opacity: 0.5 }}>{loadProgress}%</p>
        </div>
      )}

      <button 
        onClick={() => setPage("GARAGE")} 
        style={{ 
          position: "fixed", top: 40, left: 40, zIndex: 100,
          backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(10px)",
          border: `1px solid ${carData.color || "#fff"}`, color: "#fff",
          padding: "12px 25px", borderRadius: "50px", cursor: "pointer",
          fontSize: "10px", fontWeight: "bold", letterSpacing: 2
        }}
      >
        ← EXIT GARAGE
      </button>

      <div style={{ 
        position: "fixed", right: 40, top: "50%", transform: "translateY(-50%)", 
        zIndex: 50, textAlign: "right", pointerEvents: "none" 
      }}>
        <h3 style={{ fontSize: 40, fontWeight: "900", margin: 0, textTransform: "uppercase" }}>{carData.name}</h3>
        <p style={{ color: carData.color, letterSpacing: 5, fontSize: 10 }}>{carData.brand} // 360° VIEW</p>
      </div>

      <canvas 
        ref={canvasRef} 
        style={{ 
          display: "block", width: "100vw", height: "100vh", 
          position: "fixed", top: 0, left: 0 
        }} 
      />

      {isLoaded && (
        <div style={{ position: "fixed", bottom: 40, left: "50%", transform: "translateX(-50%)", opacity: 0.3 }}>
          <div style={{ width: 1, height: 60, background: `linear-gradient(to bottom, ${carData.color}, transparent)` }} />
          <p style={{ fontSize: 8, letterSpacing: 3, marginTop: 10 }}>SCROLL TO ROTATE</p>
        </div>
      )}
    </div>
  );
}