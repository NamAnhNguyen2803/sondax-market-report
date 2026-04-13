import { C } from "../data/colors.js";

export default function H2({ children }) {
  return (
    <h2 style={{ color: C.text, fontSize: 17, fontWeight: 700, margin: "24px 0 12px", borderLeft: `4px solid ${C.accent}`, paddingLeft: 12 }}>
      {children}
    </h2>
  );
}
