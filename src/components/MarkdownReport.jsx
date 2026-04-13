import { lazy, Suspense } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { C } from "../data/colors.js";
import { headingToId } from "../utils/mdSplit.js";

// Lazy-load mermaid renderer — keeps it out of the initial bundle
const MermaidDiagram = lazy(() => import("./MermaidDiagram.jsx"));

const styles = {
  h1: { color: C.text, fontSize: 20, fontWeight: 800, margin: "24px 0 12px", borderLeft: `4px solid ${C.accent}`, paddingLeft: 12 },
  // Special style for # PHẦN / # PART dividers
  partHeader: {
    color: C.text, fontSize: 14, fontWeight: 800,
    margin: "32px -4px 16px",
    padding: "10px 16px",
    background: `linear-gradient(90deg, ${C.accent}1a 0%, transparent 80%)`,
    borderLeft: `4px solid ${C.accent}`,
    textTransform: "uppercase", letterSpacing: 0.8,
    borderRadius: "0 8px 8px 0",
  },
  h2: { color: C.text, fontSize: 17, fontWeight: 700, margin: "22px 0 10px", borderLeft: `4px solid ${C.accent}`, paddingLeft: 12 },
  h3: { color: C.text, fontSize: 15, fontWeight: 700, margin: "18px 0 8px" },
  h4: { color: C.accent, fontSize: 13, fontWeight: 700, margin: "14px 0 6px", textTransform: "uppercase", letterSpacing: 1 },
  p:  { color: C.muted, fontSize: 13, lineHeight: 1.75, margin: "8px 0" },
  li: { color: C.muted, fontSize: 13, lineHeight: 1.75, marginBottom: 4 },
  a:  { color: C.accent, textDecoration: "none", borderBottom: `1px dashed ${C.accent}60` },
  code: { background: "#0b1222", color: C.accent, padding: "1px 6px", borderRadius: 4, fontSize: 12, fontFamily: "ui-monospace, SFMono-Regular, monospace" },
  pre: { background: "#0b1222", color: C.text, padding: 14, borderRadius: 8, border: `1px solid ${C.border}`, overflow: "auto", fontSize: 12, lineHeight: 1.6, margin: "10px 0" },
  blockquote: { borderLeft: `3px solid ${C.accent}`, background: `${C.accent}10`, padding: "10px 14px", margin: "12px 0", color: C.text, borderRadius: "0 8px 8px 0", fontSize: 13, lineHeight: 1.7 },
  hr: { border: 0, borderTop: `1px solid ${C.border}`, margin: "24px 0" },
  table: { width: "100%", borderCollapse: "separate", borderSpacing: 0, background: C.card, borderRadius: 10, overflow: "hidden", border: `1px solid ${C.border}`, fontSize: 12, margin: "10px 0" },
  th: { padding: "10px 12px", textAlign: "left", color: C.muted, fontWeight: 700, background: "#1a2744", borderBottom: `1px solid ${C.border}`, fontSize: 11 },
  td: { padding: "9px 12px", color: C.text, borderBottom: `1px solid ${C.border}`, lineHeight: 1.55, verticalAlign: "top" },
  strong: { color: C.text, fontWeight: 700 },
  em: { color: C.pink, fontStyle: "italic" },
};

const components = {
  h1: ({ node, children, ...p }) => {
    const text = Array.isArray(children)
      ? children.map(c => (typeof c === "string" ? c : "")).join("")
      : String(children ?? "");
    const isPart = /^(?:PHẦN|PART)\s+[A-F]/i.test(text);
    const id = headingToId(text);
    return <h1 id={id} style={isPart ? styles.partHeader : styles.h1} {...p}>{children}</h1>;
  },
  h2: ({ node, ...p }) => <h2 style={styles.h2} {...p} />,
  h3: ({ node, ...p }) => <h3 style={styles.h3} {...p} />,
  h4: ({ node, ...p }) => <h4 style={styles.h4} {...p} />,
  p:  ({ node, ...p }) => <p  style={styles.p}  {...p} />,
  a:  ({ node, ...p }) => <a  style={styles.a}  target="_blank" rel="noreferrer" {...p} />,
  li: ({ node, ...p }) => <li style={styles.li} {...p} />,
  code: ({ node, inline, className, children, ...p }) => {
    const lang = (className ?? "").replace("language-", "");
    if (!inline && lang === "mermaid") {
      return (
        <Suspense fallback={<div style={{ color: C.muted, fontSize: 11, padding: 8 }}>Rendering diagram…</div>}>
          <MermaidDiagram code={String(children)} />
        </Suspense>
      );
    }
    return inline
      ? <code style={styles.code} className={className} {...p}>{children}</code>
      : <code className={className} {...p}>{children}</code>;
  },
  pre: ({ node, ...p }) => <pre style={styles.pre} {...p} />,
  blockquote: ({ node, ...p }) => <blockquote style={styles.blockquote} {...p} />,
  hr: () => <hr style={styles.hr} />,
  table: ({ node, ...p }) => (
    <div style={{ overflowX: "auto", margin: "10px 0" }}>
      <table style={styles.table} {...p} />
    </div>
  ),
  th: ({ node, ...p }) => <th style={styles.th} {...p} />,
  td: ({ node, ...p }) => <td style={styles.td} {...p} />,
  strong: ({ node, ...p }) => <strong style={styles.strong} {...p} />,
  em: ({ node, ...p }) => <em style={styles.em} {...p} />,
};

export default function MarkdownReport({ source }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {source}
    </ReactMarkdown>
  );
}
