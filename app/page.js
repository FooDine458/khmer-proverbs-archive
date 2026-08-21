import collection from "../collection.config.js";

const styles = {
  hero: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "80px 24px",
    background:
      "radial-gradient(circle at 50% 0%, #3A1220 0%, #14181F 60%)",
  },
  badge: {
    display: "inline-block",
    fontFamily: "'Courier New', monospace",
    backgroundColor: "#E8B94A",
    color: "#14181F",
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: 2,
    textTransform: "uppercase",
    padding: "8px 18px",
    borderRadius: 999,
  },
  title: {
    fontSize: "clamp(40px, 8vw, 96px)",
    fontWeight: 800,
    lineHeight: 1.02,
    margin: "28px 0 20px",
    maxWidth: 900,
    background: "linear-gradient(135deg, #FFFFFF 0%, #E8B94A 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  description: {
    fontSize: 20,
    color: "#B7C0CC",
    lineHeight: 1.6,
    maxWidth: 620,
    margin: 0,
  },
  statRow: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 48,
    marginTop: 64,
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  statValue: {
    fontSize: 32,
    fontWeight: 800,
    color: "#FFFFFF",
    margin: 0,
  },
  statLabel: {
    fontFamily: "'Courier New', monospace",
    fontSize: 12,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#E8B94A",
    marginTop: 6,
  },
  count: {
    fontFamily: "'Courier New', monospace",
    fontSize: 16,
    color: "#5A6373",
    marginTop: 80,
  },
  footer: {
    fontSize: 13,
    color: "#5A6373",
    maxWidth: 480,
    margin: "24px auto 0",
    lineHeight: 1.6,
  },
};

export default function Home() {
  return (
    <main style={styles.hero}>
      <span style={styles.badge}>Khmer Living Archive</span>
      <h1 style={styles.title}>{collection.name}</h1>
      <p style={styles.description}>{collection.description}</p>

      <div style={styles.statRow}>
        <div style={styles.stat}>
          <p style={styles.statValue}>{collection.curator}</p>
          <p style={styles.statLabel}>Curated by</p>
        </div>
        <div style={styles.stat}>
          <p style={styles.statValue}>{collection.source}</p>
          <p style={styles.statLabel}>Source</p>
        </div>
      </div>

      <p style={styles.count}>entries in the archive: 0 (for now)</p>

      <footer style={styles.footer}>
        Built in ICT 340 — Vibe Coding, American University of Phnom Penh, Fall
        2026. This archive is under construction all semester. Come back in
        December.
      </footer>
    </main>
  );
}
