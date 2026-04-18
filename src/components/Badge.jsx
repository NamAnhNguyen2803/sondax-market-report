export default function Badge({ color, children }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "2px 9px",
      borderRadius: 999,
      fontSize: 10.5, fontWeight: 700,
      background: `${color}1f`,
      color,
      border: `1px solid ${color}55`,
      letterSpacing: 0.4,
    }}>
      {children}
    </span>
  );
}
