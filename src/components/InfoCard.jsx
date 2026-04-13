import { C } from "../data/colors.js";
import Card from "./Card.jsx";

export default function InfoCard({ color, flag, name, lines }) {
  return (
    <Card style={{ borderTop: `3px solid ${color}`, padding: 16 }}>
      <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>{flag} {name}</div>
      {lines.map(([label, detail], j) => (
        <div key={j} style={{ fontSize: 11, color: C.muted, lineHeight: 1.7, marginBottom: 5 }}>
          <strong style={{ color: C.text }}>{label}</strong> {detail}
        </div>
      ))}
    </Card>
  );
}
