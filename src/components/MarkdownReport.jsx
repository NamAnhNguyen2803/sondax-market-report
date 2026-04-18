import { lazy, Suspense } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { T } from "../data/colors.js";
import { headingToId } from "../utils/mdSplit.js";

// Lazy-load mermaid renderer — keeps it out of the initial bundle
const MermaidDiagram = lazy(() => import("./MermaidDiagram.jsx"));

const styles = {
  h1: {
    color: T.ink, fontSize: 26, fontWeight: 600,
    margin: "28px 0 14px",
    borderLeft: `4px solid ${T.lavender}`,
    paddingLeft: 14,
    fontFamily: "'Fraunces', Georgia, serif",
    letterSpacing: "-0.015em",
    lineHeight: 1.25,
  },
  partHeader: {
    color: T.lavenderInk, fontSize: 14, fontWeight: 700,
    margin: "32px -4px 18px",
    padding: "12px 18px",
    background: T.lavenderSoft,
    borderLeft: `4px solid ${T.lavender}`,
    textTransform: "uppercase", letterSpacing: 1.2,
    borderRadius: "0 12px 12px 0",
  },
  h2: {
    color: T.ink, fontSize: 21, fontWeight: 600,
    margin: "26px 0 12px",
    borderLeft: `4px solid ${T.lavender}`,
    paddingLeft: 14,
    fontFamily: "'Fraunces', Georgia, serif",
    letterSpacing: "-0.015em",
    lineHeight: 1.3,
  },
  h3: {
    color: T.ink, fontSize: 17, fontWeight: 600,
    margin: "20px 0 10px",
    fontFamily: "'Fraunces', Georgia, serif",
    letterSpacing: "-0.01em",
  },
  h4: {
    color: T.lavender, fontSize: 11, fontWeight: 800,
    margin: "16px 0 8px",
    textTransform: "uppercase", letterSpacing: 1.4,
  },
  p:  { color: T.ink, fontSize: 14, lineHeight: 1.75, margin: "10px 0" },
  li: { color: T.ink, fontSize: 14, lineHeight: 1.75, marginBottom: 4 },
  a:  {
    color: T.peach, textDecoration: "none",
    borderBottom: `1px dashed ${T.peach}88`, fontWeight: 600,
  },
  code: {
    background: T.lavenderSoft, color: T.lavenderInk,
    padding: "1px 7px", borderRadius: 6, fontSize: 12.5,
    fontFamily: "ui-monospace, SFMono-Regular, monospace",
  },
  pre: {
    background: T.bgAlt, color: T.ink,
    padding: 16, borderRadius: 12, border: `1px solid ${T.line}`,
    overflow: "auto", fontSize: 12.5, lineHeight: 1.6,
    margin: "12px 0",
  },
  blockquote: {
    borderLeft: `3px solid ${T.peach}`,
    background: T.peachSoft,
    padding: "12px 16px", margin: "14px 0",
    color: T.ink, borderRadius: "0 12px 12px 0",
    fontSize: 14, lineHeight: 1.7,
  },
  hr: { border: 0, borderTop: `1px solid ${T.line}`, margin: "28px 0" },
  table: {
    width: "100%", borderCollapse: "separate", borderSpacing: 0,
    background: T.surface, borderRadius: 14, overflow: "hidden",
    border: `1px solid ${T.line}`, fontSize: 12.5, margin: "12px 0",
    boxShadow: "0 1px 2px rgba(168,143,191,0.05)",
  },
  th: {
    padding: "11px 14px", textAlign: "left",
    color: T.lavender, fontWeight: 800,
    background: T.lavenderSoft, borderBottom: `1px solid ${T.line}`,
    fontSize: 11, textTransform: "uppercase", letterSpacing: 1.2,
  },
  td: {
    padding: "10px 14px", color: T.ink,
    borderBottom: `1px solid ${T.line}`,
    lineHeight: 1.6, verticalAlign: "top",
  },
  strong: { color: T.ink, fontWeight: 700 },
  em: { color: T.peachInk, fontStyle: "italic" },
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
  h2: ({ node, children, ...p }) => {
    const text = Array.isArray(children)
      ? children.map(c => (typeof c === "string" ? c : "")).join("")
      : String(children ?? "");
    const id = headingToId(text);
    return <h2 id={id} style={styles.h2} {...p}>{children}</h2>;
  },
  h3: ({ node, ...p }) => <h3 style={styles.h3} {...p} />,
  h4: ({ node, ...p }) => <h4 style={styles.h4} {...p} />,
  p:  ({ node, ...p }) => <p  style={styles.p}  {...p} />,
  a:  ({ node, ...p }) => <a  style={styles.a}  target="_blank" rel="noreferrer" {...p} />,
  li: ({ node, ...p }) => <li style={styles.li} {...p} />,
  code: ({ node, inline, className, children, ...p }) => {
    const lang = (className ?? "").replace("language-", "");
    if (!inline && lang === "mermaid") {
      return (
        <Suspense fallback={<div style={{ color: T.inkSoft, fontSize: 11, padding: 8 }}>Rendering diagram…</div>}>
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
    <div style={{ overflowX: "auto", margin: "12px 0" }}>
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
