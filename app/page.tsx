"use client";

import { useEffect, useRef, useState } from "react";
import About from "@/components/About";
import Thoughts from "@/components/Thoughts";
import Work from "@/components/Work";
import Connect from "@/components/Connect";

// ─── types ────────────────────────────────────────────────────────────────────
interface FloatingPetal {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  rotation: number;
  color: string;
}

// ─── constants ────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "about", section: "about" },

  { label: "journal", section: "thoughts" },

  { label: "work", section: "work" },

  { label: "connect", section: "connect" },
] as const;

type SectionType =
  | "about"
  | "thoughts"
  | "work"
  | "connect";

const PETAL_COLORS = [
  "#fde8ef", "#f5c842", "#fdf6e2",
  "#fce4b0", "#f9d0e0", "#fff8d6",
];

const CURSOR_TRAIL_SIZE = 12;

// ─── helpers ─────────────────────────────────────────────────────────────────
function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function generatePetals(count: number): FloatingPetal[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: randomBetween(0, 100),
    size: randomBetween(8, 20),
    delay: randomBetween(0, 8),
    duration: randomBetween(10, 20),
    rotation: randomBetween(0, 360),
    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
  }));
}

// ─── useWindowWidth hook ──────────────────────────────────────────────────────
// 📍 RESPONSIVE HOOK — drives all breakpoint logic in the component.
// Breakpoints used:
//   isMobile  → width < 640px   (phone)
//   isTablet  → width < 900px   (tablet / small laptop)
function useWindowWidth() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return width;
}

// ─── sub-components ───────────────────────────────────────────────────────────

function Sunflower({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(40,40)">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <ellipse key={angle} cx={0} cy={-26} rx={8} ry={15}
            fill={i % 2 === 0 ? "#f5c842" : "#efb830"}
            transform={`rotate(${angle})`} />
        ))}
        <circle cx={0} cy={0} r={15} fill="#7a4a10" />
        <circle cx={0} cy={0} r={11} fill="#5a3208" />
        {[-4, 0, 4, -4, 4].map((x, i) => (
          <circle key={i} cx={x}
            cy={i < 3 ? [-4, 0, -4][i] : [3, 3][i - 3]}
            r={1.6} fill="#8a6030" opacity={0.7} />
        ))}
      </g>
    </svg>
  );
}

function FloatingPetalsLayer({ petals }: { petals: FloatingPetal[] }) {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
      {petals.map((p) => (
        <div key={p.id} style={{
          position: "absolute", left: `${p.x}%`, top: "-30px",
          width: p.size, height: p.size * 1.4, background: p.color,
          borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
          opacity: 0.65,
          animation: `petalFall ${p.duration}s ${p.delay}s linear infinite`,
          transform: `rotate(${p.rotation}deg)`,
        }} />
      ))}
    </div>
  );
}

// ─── letter modal ─────────────────────────────────────────────────────────────
function LetterModal({ onClose }: { onClose: () => void }) {
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  const handleSend = () => {
    if (!senderName.trim() || !senderEmail.trim() || !message.trim()) return;
    const subject = encodeURIComponent(`✦ a little hello from ${senderName}`);
    const body = encodeURIComponent(
      `hi nitishaa!\n\n${message}\n\n— ${senderName}\n${senderEmail}`
    );
    window.open(`mailto:nitishaabarua@gmail.com?subject=${subject}&body=${body}`);
    setSent(true);
  };

  const allFilled = senderName.trim() && senderEmail.trim() && message.trim();

  return (
    <div onClick={handleClose} style={{
      position: "fixed", inset: 0, background: "rgba(61,44,14,0.35)",
      zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center",
      padding: "1rem", opacity: visible ? 1 : 0, transition: "opacity 0.3s ease",
      backdropFilter: "blur(3px)",
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        position: "relative", width: "100%", maxWidth: 480,
        transform: visible ? "translateY(0) rotate(-0.5deg)" : "translateY(40px)",
        transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
      }}>
        {/* envelope flap */}
        <div style={{
          width: "100%", height: 36, background: "#fde8ef",
          borderRadius: "12px 12px 0 0", border: "1px solid #f0d88a",
          borderBottom: "none", display: "flex", alignItems: "center",
          justifyContent: "center", position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: "50%",
            height: "100%", borderRight: "1px solid #f2c8d6",
            background: "linear-gradient(135deg, #fde8ef 50%, #fad0e0 100%)" }} />
          <div style={{ position: "absolute", right: 0, top: 0, width: "50%",
            height: "100%", background: "linear-gradient(225deg, #fde8ef 50%, #fad0e0 100%)" }} />
          <span style={{ position: "relative", zIndex: 1, fontSize: 11,
            color: "#c97a9a", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            ✦ a little letter ✦
          </span>
        </div>

        {/* letter body */}
        <div style={{ background: "#fffdf4", border: "1px solid #f0d88a",
          borderTop: "none", borderRadius: "0 0 16px 16px", padding: "2rem" }}>
          {!sent ? (
            <>
              <p style={{ fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic", fontSize: 22, color: "#3d2c0e", marginBottom: "1.5rem" }}>
                say hello ✦
              </p>

              {([
                { label: "your name", value: senderName, setter: setSenderName, type: "text", placeholder: "what should i call you?" },
                { label: "your email", value: senderEmail, setter: setSenderEmail, type: "email", placeholder: "so i can write back" },
              ] as const).map(({ label, value, setter, type, placeholder }) => (
                <div key={label} style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", fontSize: 11, color: "#c8923a",
                    letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
                    {label}
                  </label>
                  <input type={type} value={value}
                    onChange={(e) => setter(e.target.value)} placeholder={placeholder}
                    style={{ width: "100%", padding: "10px 14px", background: "#fdf6e2",
                      border: "1px solid #f0d88a", borderRadius: 10, fontSize: 14,
                      color: "#3d2c0e", fontFamily: "'DM Sans', sans-serif", outline: "none" }} />
                </div>
              ))}

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontSize: 11, color: "#c8923a",
                  letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
                  your message
                </label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)}
                  placeholder="say anything — hi works too ☀" rows={4}
                  style={{ width: "100%", padding: "10px 14px", background: "#fdf6e2",
                    border: "1px solid #f0d88a", borderRadius: 10, fontSize: 14,
                    color: "#3d2c0e", fontFamily: "'DM Sans', sans-serif",
                    outline: "none", resize: "none", lineHeight: 1.7 }} />
              </div>

              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <button onClick={handleSend} disabled={!allFilled} style={{
                  flex: 1, background: allFilled ? "#f5c842" : "#f0e8c0",
                  color: allFilled ? "#3d2c0e" : "#b8a870", border: "none",
                  borderRadius: 999, padding: "11px 0", fontSize: 13, fontWeight: 500,
                  fontFamily: "'DM Sans', sans-serif",
                  cursor: allFilled ? "pointer" : "not-allowed",
                  transition: "background 0.2s", letterSpacing: "0.04em",
                }}>send it ✦</button>
                <button onClick={handleClose} style={{
                  background: "transparent", border: "1px solid #f0d88a",
                  borderRadius: 999, padding: "11px 20px", fontSize: 13,
                  color: "#9a8050", fontFamily: "'DM Sans', sans-serif", cursor: "pointer",
                }}>nevermind</button>
              </div>

              <p style={{ fontSize: 11, color: "#b8a870", textAlign: "center",
                marginTop: "1rem", lineHeight: 1.6 }}>
                clicking &ldquo;send it&rdquo; opens your email app with the message pre-filled.
              </p>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
              <div style={{ fontSize: 48, marginBottom: "1rem" }}>🌻</div>
              <p style={{ fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic", fontSize: 22, color: "#3d2c0e", marginBottom: "0.75rem" }}>
                your letter is ready!
              </p>
              <p style={{ fontSize: 14, color: "#7a6430", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                your email app should have opened with everything pre-filled.
                just hit send and i&apos;ll hear from you ☀
              </p>
              <button onClick={handleClose} style={{
                background: "#f5c842", color: "#3d2c0e", border: "none",
                borderRadius: 999, padding: "10px 28px", fontSize: 13, fontWeight: 500,
                fontFamily: "'DM Sans', sans-serif", cursor: "pointer",
              }}>close ✦</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── main component ────────────────────────────────────────────────────────────
export default function LandingPage() {
  const [petals, setPetals] = useState<FloatingPetal[]>([]);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const trailRef = useRef(0);
  const [letterOpen, setLetterOpen] = useState(false);
  // 📍 RESPONSIVE: hamburger menu state for mobile nav
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionType>("about");

  const width = useWindowWidth();
  // 📍 BREAKPOINTS — change these values to adjust layout switching
  const isMobile = width > 0 && width < 640;   // phone
  const isTablet = width > 0 && width < 900;   // tablet / small laptop

  const sectionRef = useRef<HTMLElement>(null);
  const goToSection = (section: SectionType) => {
    setActiveSection(section);
    requestAnimationFrame(() => sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  useEffect(() => { setPetals(generatePetals(18)); }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      setTrail((prev) =>
        [{ x: e.clientX, y: e.clientY, id: trailRef.current++ }, ...prev].slice(0, CURSOR_TRAIL_SIZE)
      );
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // close menu on resize to desktop
  useEffect(() => {
    if (!isTablet) setMenuOpen(false);
  }, [isTablet]);

  return (
    <>
      {letterOpen && <LetterModal onClose={() => setLetterOpen(false)} />}

      {/* ── global styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html, body {
          background: #fffdf4;
          font-family: 'DM Sans', sans-serif;
          overflow-x: hidden;
          /* 📍 cursor: none is desktop-only — see cursor elements below */
        }

        @keyframes petalFall {
          0%   { transform: translateY(-30px) rotate(0deg); opacity: 0; }
          10%  { opacity: 0.65; }
          90%  { opacity: 0.65; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        @keyframes swaySunflower {
          0%, 100% { transform: rotate(-4deg); }
          50%       { transform: rotate(4deg); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(245,200,66,0.4); }
          50%       { box-shadow: 0 0 0 8px rgba(245,200,66,0); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* 📍 Hide custom cursor on touch/mobile devices */
        @media (hover: none) {
          html, body { cursor: auto !important; }
          .cursor-trail, .cursor-ring { display: none !important; }
        }
        @media (min-width: 900px) {
          html, body { cursor: none; }
        }

        .nav-link {
          font-size: 13px;
          color: #9a8050;
          text-decoration: none;
          letter-spacing: 0.06em;
          padding: 4px 0;
          border-bottom: 1px solid transparent;
          transition: color 0.2s, border-color 0.2s;
          cursor: none;
        }
        .nav-link:hover { color: #c8923a; border-color: #f5c842; }

        /* 📍 Mobile nav links — full width, larger tap targets */
        .nav-link-mobile {
          display: block;
          font-size: 18px;
          color: #3d2c0e;
          text-decoration: none;
          padding: 14px 0;
          border-bottom: 1px solid #f5e6b8;
          font-family: 'Playfair Display', Georgia, serif;
          font-style: italic;
          letter-spacing: 0.04em;
        }
        .nav-link-mobile:last-child { border-bottom: none; }

        .btn-main {
          background: #f5c842;
          color: #3d2c0e;
          font-size: 13px;
          font-weight: 500;
          padding: 11px 26px;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          letter-spacing: 0.04em;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.2s, transform 0.15s;
          animation: pulseGlow 2.5s ease-in-out infinite;
        }
        .btn-main:hover { background: #e8b830; transform: scale(1.04); }

        .btn-sec {
          background: transparent;
          color: #9a8050;
          font-size: 13px;
          padding: 11px 26px;
          border-radius: 999px;
          border: 1.5px solid #f0d88a;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.2s, color 0.2s;
        }
        .btn-sec:hover { background: #fdf6e0; color: #c8923a; }

        /* 📍 Full-width buttons on mobile */
        @media (max-width: 639px) {
          .btn-main, .btn-sec { width: 100%; text-align: center; }
        }

        .section-card {
          background: #fff;
          border: 1px solid #f0d88a;
          border-radius: 16px;
          padding: 20px 24px;
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: pointer;
        }
        .section-card:hover {
          transform: translateY(-3px) rotate(-0.5deg);
          box-shadow: 0 8px 28px rgba(200,160,60,0.12);
        }

        /* 📍 Hamburger button */
        .hamburger {
          display: flex;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 4px;
        }
        .hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: #7a6430;
          border-radius: 2px;
          transition: transform 0.2s, opacity 0.2s;
        }
      `}</style>

      {/* ── custom cursor (desktop only via CSS above) ── */}
      {trail.map((t, i) => (
        <div key={t.id} className="cursor-trail" style={{
          position: "fixed", left: t.x - 5, top: t.y - 5,
          width: 10 - i * 0.5, height: 10 - i * 0.5, borderRadius: "50%",
          background: i % 3 === 0 ? "#f5c842" : i % 3 === 1 ? "#fde8ef" : "#f4a8c0",
          opacity: 1 - i / CURSOR_TRAIL_SIZE, pointerEvents: "none", zIndex: 9999,
        }} />
      ))}
      <div className="cursor-ring" style={{
        position: "fixed", left: cursorPos.x - 8, top: cursorPos.y - 8,
        width: 16, height: 16, borderRadius: "50%",
        border: "2px solid #c8923a", background: "transparent",
        pointerEvents: "none", zIndex: 10000,
      }} />

      <FloatingPetalsLayer petals={petals} />

      <div style={{ position: "relative", background: "#fffdf4", minHeight: "100vh", zIndex: 1 }}>

        {/* ── nav ── */}
        {/* 📍 NAV: desktop shows inline links; tablet/mobile shows hamburger */}
        <nav style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: isMobile ? "1rem 1.25rem" : "1.5rem 3rem",
          borderBottom: "1px solid #f5e6b8", position: "sticky", top: 0,
          background: "rgba(255,253,244,0.95)", backdropFilter: "blur(8px)", zIndex: 100,
        }}>
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: isMobile ? 14 : 16, color: "#7a6430",
            letterSpacing: "0.04em", fontStyle: "italic" }}>
            nitishaa barua
          </span>

          {/* Desktop nav links */}
          {!isTablet && (
 <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "0.75rem",
      marginBottom: "0 rem",
    }}
  >
    {NAV_LINKS.map((link) => (
      <button
        key={link.label}
        onClick={() => goToSection(link.section)}
        style={{
          border:
            activeSection === link.section
              ? "1px solid #f5c842"
              : "1px solid #f0d88a",
          background:
            activeSection === link.section
              ? "#fde8ef"
              : "#fffdf4",
          color:
            activeSection === link.section
              ? "#c97a9a"
              : "#7a6430",
          padding: "0.7rem 1.2rem",
          borderRadius: 999,
          fontFamily:
            "'Playfair Display', Georgia, serif",
          fontStyle: "italic",
          cursor: "pointer",
          transition: "all 0.25s ease",
        }}
      >
        {link.label}
      </button>
    ))}
  </div>

          )}

          {/* 📍 Hamburger button — tablet & mobile only */}
          {isTablet && (
            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu">
              <span style={{ transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
              <span style={{ opacity: menuOpen ? 0 : 1 }} />
              <span style={{ transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
            </button>
          )}
        </nav>

        {/* 📍 MOBILE DROPDOWN MENU */}
        {isTablet && menuOpen && (
          <div style={{
            position: "fixed", top: isMobile ? 57 : 73, left: 0, right: 0,
            background: "#fffdf4", borderBottom: "1px solid #f5e6b8",
            padding: "0.5rem 1.5rem 1rem", zIndex: 99,
            animation: "slideDown 0.2s ease both",
            boxShadow: "0 8px 24px rgba(180,140,60,0.08)",
          }}>
           {NAV_LINKS.map((link) => (
  <button
    key={link.label}
    className="nav-link-mobile"
    onClick={() => {
      goToSection(link.section);
      setMenuOpen(false);
    }}
    style={{
      background: "none",
      border: "none",
      textAlign: "left",
      width: "100%",
    }}
  >
    {link.label}
  </button>
))}
          </div>
        )}

        {/* ── compact header ── */}
        {/* 📍 HEADER: short intro strip so nav + active section are visible without scrolling */}
        <section style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: isMobile ? "1rem" : "1.5rem",
          padding: isMobile ? "1.25rem 1.25rem 1rem" : "1.75rem 3rem 1.25rem",
          animation: "fadeUp 0.5s ease both",
        }}>
          <div style={{ animation: "swaySunflower 4s ease-in-out infinite" }}>
            <Sunflower size={isMobile ? 40 : 52} />
          </div>

          <div style={{ flex: "1 1 320px" }}>
            <span style={{
              display: "inline-block", background: "#fde8ef", color: "#c97a9a",
              fontSize: 11, letterSpacing: "0.12em",
              padding: "4px 14px", borderRadius: 999,
              marginBottom: "0.5rem", fontWeight: 500,
            }}>✦ august child ✦</span>

            <h1 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(22px, 3.5vw, 30px)",
              lineHeight: 1.2, color: "#3d2c0e", fontWeight: 500,
            }}>
              hi, i&apos;m <em style={{ color: "#c8923a", fontStyle: "italic" }}>nitishaa.</em>{" "}
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontStyle: "normal",
                fontSize: isMobile ? 13 : 14, color: "#7a6430", fontWeight: 400,
              }}>
                frontend developer, sunflower soul.
              </span>
            </h1>
          </div>

          <div style={{
            display: "flex", gap: 10,
            flexDirection: isMobile ? "column" : "row",
            width: isMobile ? "100%" : "auto",
          }}>
            <button className="btn-main" onClick={() => goToSection("work")}>see my work</button>
            <button className="btn-sec" onClick={() => setLetterOpen(true)}>say hello</button>
          </div>
        </section>

        {/* ── active section ── */}
        <section ref={sectionRef} style={{
          padding: isMobile ? "1rem 1.25rem 4rem" : isTablet ? "1rem 2rem 4rem" : "1rem 3rem 5rem",
          borderTop: "1px solid #f5e6b8",
          scrollMarginTop: isMobile ? 57 : 73,
        }}>
          {activeSection === "about" && <About />}
          {activeSection === "thoughts" && <Thoughts />}
          {activeSection === "work" && <Work />}
          {activeSection === "connect" && <Connect onOpenLetter={() => setLetterOpen(true)} />}
        </section>
      </div>
    </>
  );
}