import { C } from "../data/colors.js";

export default function Card({ children, style }) {
  return (
    <div style={{ background: C.card, borderRadius: 12, padding: 18, border: `1px solid ${C.border}`, ...style }}>
      {children}
    </div>
  );
}
