import { T } from "../data/colors.js";

export default function Card({ children, style }) {
  return (
    <div style={{
      background: T.surface,
      borderRadius: 16,
      padding: 18,
      border: `1px solid ${T.line}`,
      boxShadow: "0 1px 2px rgba(168,143,191,0.06), 0 8px 24px -16px rgba(168,143,191,0.18)",
      ...style,
    }}>
      {children}
    </div>
  );
}
