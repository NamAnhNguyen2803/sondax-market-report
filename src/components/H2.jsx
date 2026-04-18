import { T } from "../data/colors.js";

export default function H2({ children }) {
  return (
    <h2 className="serif" style={{
      color: T.ink, fontSize: 22, fontWeight: 600,
      margin: "26px 0 14px",
      borderLeft: `4px solid ${T.lavender}`,
      paddingLeft: 14,
      lineHeight: 1.3,
    }}>
      {children}
    </h2>
  );
}
