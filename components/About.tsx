const SKILLS = [
  "React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "UI/UX",
];

const FUN_FACTS = [
  { emoji: "☀", text: "born in august, still living up to it" },
  { emoji: "🌻", text: "will stop mid-walk to say hi to any pomeranian" },
  { emoji: "📖", text: "always got a book half-finished on the nightstand" },
  { emoji: "✈", text: "collects tiny travel notebooks more than souvenirs" },
];

export default function About() {
  return (
    <div style={{ animation: "fadeUp 0.5s ease both" }}>
      <span style={{
        display: "inline-block", background: "#fde8ef", color: "#c97a9a",
        fontSize: 12, letterSpacing: "0.12em", padding: "5px 16px",
        borderRadius: 999, marginBottom: "1.25rem", fontWeight: 500,
      }}>✦ a little about me ✦</span>

      <h2 style={{
        fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic",
        fontSize: "clamp(26px, 4vw, 34px)", color: "#3d2c0e", marginBottom: "1.25rem",
      }}>
        so, who&apos;s nitishaa?
      </h2>

      <p style={{ fontSize: 15, color: "#7a6430", lineHeight: 1.9, maxWidth: 640, marginBottom: "1.5rem" }}>
        i&apos;m a frontend developer who thinks in components but dreams in
        watercolor. by day i&apos;m building interfaces that feel a little
        softer than the average website; by night i&apos;m journaling,
        rereading old favorites, or planning a trip i can&apos;t quite afford yet.
      </p>

      <p style={{ fontSize: 15, color: "#7a6430", lineHeight: 1.9, maxWidth: 640, marginBottom: "2rem" }}>
        i care about details &mdash; the kind most people scroll past. a nice
        transition, a warm color palette, copy that sounds like a person wrote
        it. that&apos;s the whole philosophy behind this site, honestly.
      </p>

      <h3 style={{
        fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic",
        fontSize: 16, color: "#c8923a", marginBottom: "0.9rem",
      }}>
        things i reach for
      </h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: "2rem" }}>
        {SKILLS.map((skill) => (
          <span key={skill} style={{
            fontSize: 13, color: "#7a6430", background: "#fdf6e2",
            border: "1px solid #f0d88a", borderRadius: 999, padding: "6px 16px",
          }}>{skill}</span>
        ))}
      </div>

      <h3 style={{
        fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic",
        fontSize: 16, color: "#c8923a", marginBottom: "0.9rem",
      }}>
        a few true things
      </h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.9rem" }}>
        {FUN_FACTS.map((fact) => (
          <div key={fact.text} className="section-card" style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span style={{ fontSize: 18 }}>{fact.emoji}</span>
            <p style={{ fontSize: 13.5, color: "#3d2c0e", lineHeight: 1.6 }}>{fact.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
