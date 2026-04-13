export default function Badge({ color, children }) {
  return (
    <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 20, fontSize: 10, fontWeight: 600, background: `${color}20`, color, border: `1px solid ${color}40` }}>
      {children}
    </span>
  );
}
