const SOCIALS = [
  { label: "email", value: "nitishaabarua@gmail.com", href: "mailto:nitishaabarua@gmail.com" },
  { label: "github", value: "github.com/Nitss7", href: "https://github.com/Nitss7" },
  { label: "linkedin", value: "linkedin.com/in/nitishaa-barua-22488a249", href: "https://linkedin.com/in/nitishaa-barua-22488a249" },
  { label: "resume", value: "view / download ↗", href: "/resume.pdf" },
];

export default function Connect({ onOpenLetter }: { onOpenLetter: () => void }) {
  return (
    <div style={{ animation: "fadeUp 0.5s ease both" }}>
      <span style={{
        display: "inline-block", background: "#fde8ef", color: "#c97a9a",
        fontSize: 12, letterSpacing: "0.12em", padding: "5px 16px",
        borderRadius: 999, marginBottom: "1.25rem", fontWeight: 500,
      }}>✦ let&apos;s talk ✦</span>

      <h2 style={{
        fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic",
        fontSize: "clamp(26px, 4vw, 34px)", color: "#3d2c0e", marginBottom: "0.75rem",
      }}>
        say hello, i mean it
      </h2>

      <p style={{ fontSize: 14.5, color: "#7a6430", lineHeight: 1.8, maxWidth: 560, marginBottom: "2rem" }}>
        for work, collaborations, book recommendations, or just to talk about
        pomeranians. the letter box below is the easiest way to reach me.
      </p>

      <button className="btn-main" onClick={onOpenLetter} style={{ marginBottom: "2rem" }}>
        write me a letter ✦
      </button>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.9rem" }}>
        {SOCIALS.map((social) => (
          <a key={social.label} href={social.href} className="section-card"
            target={social.href.startsWith("http") || social.href.startsWith("/") ? "_blank" : undefined}
            rel={social.href.startsWith("http") || social.href.startsWith("/") ? "noopener noreferrer" : undefined}
            style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{
              fontSize: 11, color: "#c8923a", letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}>{social.label}</span>
            <span style={{ fontSize: 14, color: "#3d2c0e" }}>{social.value}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
