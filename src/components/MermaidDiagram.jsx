import { useEffect, useState } from "react";
import mermaid from "mermaid";
import { C } from "../data/colors.js";

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  darkMode: true,
  themeVariables: {
    background:        "#0b1222",
    primaryColor:      "#1E3A5F",
    primaryTextColor:  "#E2E8F0",
    primaryBorderColor:"#38BDF8",
    lineColor:         "#38BDF8",
    secondaryColor:    "#0F172A",
    tertiaryColor:     "#1a2744",
    edgeLabelBackground:"#0b1222",
    fontFamily:        "'Segoe UI', -apple-system, sans-serif",
    fontSize:          "13px",
  },
});

let uid = 0;

export default function MermaidDiagram({ code }) {
  const [svg, setSvg] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const id = `md-${++uid}`;
    mermaid.render(id, code.trim())
      .then(({ svg: s }) => setSvg(s))
      .catch(() => setError(true));
  }, [code]);

  if (error) return (
    <pre style={{
      background: "#0b1222", color: C.muted,
      padding: 12, borderRadius: 8, fontSize: 11,
      border: `1px dashed ${C.border}`, overflow: "auto",
    }}>
      {code}
    </pre>
  );

  if (!svg) return (
    <div style={{ color: C.muted, fontSize: 11, padding: "12px 0" }}>Rendering diagram…</div>
  );

  return (
    <div
      style={{
        overflowX: "auto", margin: "14px 0",
        background: "#0b1222", borderRadius: 10,
        padding: "16px 12px",
        border: `1px solid ${C.border}`,
      }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
