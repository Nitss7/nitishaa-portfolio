const EXPERIENCE = [
  {
    role: "Frontend Developer",
    org: "Mphasis",
    place: "Bengaluru, India",
    period: "Sep 2025 — Present",
    bullets: [
      "engineered and maintained 3 production-grade mortgage applications using React, TypeScript, and Redux, with reusable component libraries that sped up feature development across teams.",
      "built complex AG Grid interfaces for sorting, filtering, and pagination across large mortgage datasets.",
    ],
    tags: ["React", "TypeScript", "Redux", "AG Grid"],
  },
];

const PROJECTS = [
  {
    title: "This Portfolio",
    description: "the very site you're on — a hand-built Next.js portfolio with a custom cursor, floating petals, and a letter-writing contact form.",
    tags: ["Next.js", "TypeScript", "React"],
    href: "https://github.com/Nitss7/nitishaa-portfolio",
  },
  {
    title: "Employee Attrition Predictor",
    description: "a full-stack app pairing a React dashboard with a Python ML model to classify attrition risk — HR users get real-time predictions with visual indicators, wired up through REST APIs.",
    tags: ["ReactJS", "Python", "Scikit-learn"],
    href: "",
  },
  {
    title: "Paying Guest Locator",
    description: "a responsive platform for students to search, browse, and shortlist PG accommodations near Jorhat Engineering College — built solo, wireframe to deployment, no frameworks.",
    tags: ["HTML5", "CSS3", "Vanilla JS"],
    href: "",
  },
  {
    title: "Smoke-Dehazer System",
    description: "a computer vision system combining the Dark Channel Prior algorithm with YOLO object detection to spot smoke in surveillance footage, aimed at faster fire response.",
    tags: ["Python", "YOLO", "OpenCV"],
    href: "",
  },
];

export default function Work() {
  return (
    <div style={{ animation: "fadeUp 0.5s ease both" }}>
      <span style={{
        display: "inline-block", background: "#fde8ef", color: "#c97a9a",
        fontSize: 12, letterSpacing: "0.12em", padding: "5px 16px",
        borderRadius: 999, marginBottom: "1.25rem", fontWeight: 500,
      }}>✦ things i&apos;ve made ✦</span>

      <h2 style={{
        fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic",
        fontSize: "clamp(26px, 4vw, 34px)", color: "#3d2c0e", marginBottom: "0.75rem",
      }}>
        a bit of my work
      </h2>

      <p style={{ fontSize: 14.5, color: "#7a6430", lineHeight: 1.8, maxWidth: 600, marginBottom: "2.5rem" }}>
        frontend developer building production React/TypeScript apps at Mphasis,
        with a soft spot for side projects that mix a bit of ML in with the UI.
      </p>

      <h3 style={{
        fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic",
        fontSize: 17, color: "#c8923a", marginBottom: "1rem",
      }}>
        currently
      </h3>
      <div style={{ display: "grid", gap: "1rem", marginBottom: "2.5rem" }}>
        {EXPERIENCE.map((job) => (
          <div key={job.role + job.org} className="section-card" style={{ cursor: "default" }}>
            <div style={{
              display: "flex", justifyContent: "space-between", flexWrap: "wrap",
              gap: 8, marginBottom: 10,
            }}>
              <div>
                <h4 style={{
                  fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic",
                  fontSize: 17, color: "#3d2c0e",
                }}>{job.role}</h4>
                <span style={{ fontSize: 13, color: "#c8923a" }}>{job.org} · {job.place}</span>
              </div>
              <span style={{ fontSize: 12, color: "#9a8050", whiteSpace: "nowrap" }}>{job.period}</span>
            </div>
            <ul style={{ paddingLeft: 18, marginBottom: 10 }}>
              {job.bullets.map((b) => (
                <li key={b} style={{ fontSize: 13.5, color: "#7a6430", lineHeight: 1.75, marginBottom: 4 }}>{b}</li>
              ))}
            </ul>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {job.tags.map((tag) => (
                <span key={tag} style={{
                  fontSize: 11, color: "#c8923a", background: "#fdf6e2",
                  border: "1px solid #f0d88a", borderRadius: 999, padding: "3px 10px",
                }}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h3 style={{
        fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic",
        fontSize: 17, color: "#c8923a", marginBottom: "1rem",
      }}>
        projects
      </h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
        {PROJECTS.map((project) => {
          const Card = project.href ? "a" : "div";
          return (
            <Card key={project.title} {...(project.href ? { href: project.href, target: "_blank", rel: "noopener noreferrer" } : {})}
              className="section-card"
              style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: 10, cursor: project.href ? "pointer" : "default" }}>
              <h4 style={{
                fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic",
                fontSize: 17, color: "#3d2c0e",
              }}>{project.title}</h4>
              <p style={{ fontSize: 13.5, color: "#7a6430", lineHeight: 1.7 }}>{project.description}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: "auto" }}>
                {project.tags.map((tag) => (
                  <span key={tag} style={{
                    fontSize: 11, color: "#c8923a", background: "#fdf6e2",
                    border: "1px solid #f0d88a", borderRadius: 999, padding: "3px 10px",
                  }}>{tag}</span>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
