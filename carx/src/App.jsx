import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HomePage from "./pages/home";
import ShowroomPage from "./pages/Showroom";
import GaragePage from "./pages/Garage";
import ContactPage from "./pages/Contact";
import ScrollVideoPage from "./pages/ScrollVideo";
import DetailPage from "./pages/DetailPage";

function Nav({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["HOME", "SHOWROOM", "GARAGE", "CONTACT"];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 900,
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
        background: scrolled ? "rgba(0,0,0,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        transition: "all 0.4s ease",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", height: 70, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        <button onClick={() => setPage("HOME")} style={{ background: "none", border: "none", cursor: "pointer" }}>
          <span className="font-display" style={{ color: "var(--cyan)", fontSize: 24, fontWeight: 800, letterSpacing: "0.08em" }}>CARX</span>
        </button>

      
        <nav style={{ display: "flex", gap: 4 }}>
          {links.map((l) => (
            <button
              key={l}
              onClick={() => setPage(l)}
              className="font-body"
              style={{
                background: page === l ? "rgba(255,255,255,0.06)" : "transparent",
                border: page === l ? "1px solid rgba(255,255,255,0.12)" : "1px solid transparent",
                color: page === l ? "#fff" : "var(--text-muted)",
                fontSize: 12, letterSpacing: "0.12em", padding: "8px 18px", cursor: "pointer",
                borderRadius: 100, transition: "all 0.3s ease", fontWeight: 500,
              }}
            >
              {l}
            </button>
          ))}
        </nav>

        <button className="btn-primary" onClick={() => setPage("CONTACT")}>BOOK TEST DRIVE</button>
      </div>
    </motion.header>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "40px 32px", marginTop: 80 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <span className="font-display" style={{ color: "var(--cyan)", fontSize: 22, fontWeight: 800, letterSpacing: "0.08em" }}>CARX</span>
        <div style={{ display: "flex", gap: 28 }}>
          {["PRIVACY", "TERMS", "LEGAL", "CONTACT"].map(l => (
            <button key={l} onClick={() => l === "CONTACT" && setPage("CONTACT")} className="font-body"
              style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: 10, letterSpacing: "0.2em", cursor: "pointer", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "var(--text-muted)"}
            >{l}</button>
          ))}
        </div>
        <span className="font-body" style={{ color: "var(--text-muted)", fontSize: 10, letterSpacing: "0.12em" }}>© 2026 CARX HYPER GARAGE. ALL RIGHTS RESERVED.</span>
      </div>
    </footer>
  );
}

export default function App() {
  const [page, setPage] = useState({ name: "HOME", car: null });

  const handleSetPage = (p) => {
    const pageObj = typeof p === "string" ? { name: p, car: null } : p;
    setPage(pageObj);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentPageName = page.name;

  const pageMap = {
    HOME: <HomePage setPage={handleSetPage} />,
    SHOWROOM: <ShowroomPage setPage={handleSetPage} />,
    GARAGE: <GaragePage setPage={handleSetPage} />,
    CONTACT: <ContactPage />,
    SCROLL_VIDEO: <ScrollVideoPage carData={page.car} setPage={handleSetPage} />,
  
    DETAILS: <DetailPage car={page.car} setPage={handleSetPage} />, 
  };

  return (
    <>
      <div className="noise-overlay" />
      <div className="scanline" />

      <Nav page={currentPageName} setPage={handleSetPage} />

      <AnimatePresence mode="wait">
        <motion.main
          key={currentPageName}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          style={{ minHeight: "100vh" }}
        >
          {pageMap[currentPageName]}
        </motion.main>
      </AnimatePresence>

      {currentPageName !== "SCROLL_VIDEO" && currentPageName !== "DETAILS" && <Footer setPage={handleSetPage} />}
    </>
  );
}