import { T } from "../data/colors.js";
import Card from "./Card.jsx";

export default function InfoCard({ color, flag, name, lines }) {
  return (
    <Card style={{ borderTop: `3px solid ${color}`, padding: 16 }}>
      <div className="serif" style={{ fontSize: 15, fontWeight: 600, marginBottom: 10, color: T.ink }}>
        {flag} {name}
      </div>
      {lines.map(([label, detail], j) => (
        <div key={j} style={{ fontSize: 11.5, color: T.inkSoft, lineHeight: 1.7, marginBottom: 5 }}>
          <strong style={{ color: T.ink }}>{label}</strong> {detail}
        </div>
      ))}
    </Card>
  );
}
