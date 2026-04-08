import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { stagger, fadeUp, InViewWrapper, slideLeft, slideRight } from "../constants";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setSent(true);
      setTimeout(() => setSent(false), 4000);
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <div className="font-body" style={{ paddingTop: 70 }}>
      <section style={{ padding: "80px 32px 60px", maxWidth: 1280, margin: "0 auto" }}>
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.div variants={fadeUp} style={{ color: "var(--cyan)", fontSize: 10, letterSpacing: "0.4em", marginBottom: 20 }}>
            ENTER THE VOID. CONNECT WITH THE FUTURE.
          </motion.div>
          <motion.h1 variants={fadeUp} className="font-display cyan-glow" style={{ fontSize: "clamp(72px, 12vw, 160px)", fontWeight: 900, lineHeight: 0.85, color: "var(--cyan)", letterSpacing: "-0.02em", marginBottom: 60 }}>
            CONTACT
          </motion.h1>
        </motion.div>
      </section>

      <section style={{ padding: "0 32px 80px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 48 }}>
          {/* FORM */}
          <InViewWrapper>
            <motion.div variants={slideLeft} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <input placeholder="YOUR FULL NAME" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              <input type="email" placeholder="EMAIL@DOMAIN.COM" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              <textarea placeholder="DESCRIBE YOUR VISION" rows={6} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ resize: "vertical" }} />
              
              <button className="btn-primary" onClick={handleSubmit} style={{ alignSelf: "flex-start", padding: "14px 36px" }}>
                {sent ? "TRANSMITTED ✓" : "SEND ENQUIRY →"}
              </button>
            </motion.div>
          </InViewWrapper>

          {/* SIDE INFO */}
          <InViewWrapper>
            <motion.div variants={slideRight} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="glass-card" style={{ borderRadius: 16, padding: "28px" }}>
                <div className="font-display" style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>BESPOKE INQUIRIES</div>
                <div style={{ color: "var(--cyan)", fontSize: 13 }}>hello@carx.void</div>
              </div>
              
              <div className="glass-card" style={{ borderRadius: 16, padding: "28px", height: 200, position: "relative", background: "linear-gradient(135deg,#050d1a,#0a1a2e)" }}>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: "var(--cyan)", boxShadow: "0 0 20px var(--cyan)" }} />
                  <span style={{ color: "var(--cyan)", fontSize: 9, marginTop: 10 }}>MONACO · 43.7384° N</span>
                </div>
              </div>
            </motion.div>
          </InViewWrapper>
        </div>
      </section>
    </div>
  );
}