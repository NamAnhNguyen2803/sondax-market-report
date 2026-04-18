import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { T } from "../data/colors.js";

mermaid.initialize({
  startOnLoad: false,
  theme: "base",
  themeVariables: {
    background:         T.surface,
    primaryColor:       T.lavenderSoft,
    primaryTextColor:   T.ink,
    primaryBorderColor: T.lavender,
    lineColor:          T.lavender,
    secondaryColor:     T.mintSoft,
    tertiaryColor:      T.peachSoft,
    edgeLabelBackground: T.surface,
    fontFamily:         "'Inter', -apple-system, sans-serif",
    fontSize:           "13px",
  },
});

let uid = 0;

export default function MermaidDiagram({ code }) {
  const scratchRef = useRef(null);
  const [svg, setSvg]     = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setSvg(null);
    setError(false);

    const scratch = document.createElement("div");
    scratch.style.visibility = "hidden";
    scratch.style.position   = "absolute";
    document.body.appendChild(scratch);

    const id = `md-${++uid}`;
    mermaid.render(id, code.trim(), scratch)
      .then(({ svg: s }) => setSvg(s))
      .catch(() => setError(true))
      .finally(() => { document.body.removeChild(scratch); });
  }, [code]);

  if (error) return (
    <pre style={{
      background: T.bgAlt, color: T.inkSoft,
      padding: 14, borderRadius: 12, fontSize: 11.5,
      border: `1px dashed ${T.line}`, overflow: "auto",
    }}>
      {code}
    </pre>
  );

  if (!svg) return (
    <div style={{ color: T.inkSoft, fontSize: 11.5, padding: "12px 0" }}>
      Rendering diagram…
    </div>
  );

  return (
    <div
      style={{
        overflowX: "auto", margin: "16px 0",
        background: T.surface, borderRadius: 14,
        padding: "18px 14px",
        border: `1px solid ${T.line}`,
        boxShadow: "0 1px 2px rgba(168,143,191,0.05)",
      }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
