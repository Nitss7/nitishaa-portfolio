const ENTRIES = [
  {
    date: "july 2026",
    title: "on slow mornings",
    excerpt: "i've started timing my coffee to how long it takes the sun to clear the balcony railing. no reason. just nice to notice.",
  },
  {
    date: "may 2026",
    title: "rereading the same three books",
    excerpt: "there's a comfort in already knowing how it ends. picking up new ones feels riskier lately, in a good way.",
  },
  {
    date: "march 2026",
    title: "a very small trip",
    excerpt: "didn't leave the city, just a different neighborhood and a notebook. turns out that counts too.",
  },
  {
    date: "january 2026",
    title: "new year, same sunflowers",
    excerpt: "skipped the resolutions this year. just want to keep noticing things worth writing down.",
  },
];

export default function Thoughts() {
  return (
    <div style={{ animation: "fadeUp 0.5s ease both" }}>
      <span style={{
        display: "inline-block", background: "#fde8ef", color: "#c97a9a",
        fontSize: 12, letterSpacing: "0.12em", padding: "5px 16px",
        borderRadius: 999, marginBottom: "1.25rem", fontWeight: 500,
      }}>✦ the journal ✦</span>

      <h2 style={{
        fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic",
        fontSize: "clamp(26px, 4vw, 34px)", color: "#3d2c0e", marginBottom: "0.75rem",
      }}>
        little notes to self
      </h2>

      <p style={{ fontSize: 14.5, color: "#7a6430", lineHeight: 1.8, maxWidth: 560, marginBottom: "2rem" }}>
        mostly unfiltered, occasionally overthought. this is where i keep the
        thoughts too small for anywhere else.
      </p>

      <div style={{ display: "grid", gap: "1rem" }}>
        {ENTRIES.map((entry) => (
          <div key={entry.title} className="section-card" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{
              fontSize: 11, color: "#c8923a", letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}>{entry.date}</span>
            <h3 style={{
              fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic",
              fontSize: 18, color: "#3d2c0e",
            }}>{entry.title}</h3>
            <p style={{ fontSize: 13.5, color: "#7a6430", lineHeight: 1.75 }}>{entry.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
