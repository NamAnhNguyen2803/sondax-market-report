/**
 * Extract # PHẦN / # PART headings from markdown source.
 * Returns array of { label, id, shortLabel } for building PartNav links.
 */
export function extractPartHeadings(source) {
  const parts = [];
  for (const line of source.split("\n")) {
    // Match: # PHẦN A — ... or # PART A — ...
    if (/^# (?:PHẦN|PART) [A-F]/.test(line)) {
      const text = line.replace(/^# /, "").trim();
      const letter = text.match(/(?:PHẦN|PART) ([A-F])/)?.[1] ?? "";
      const id = `part-${letter.toLowerCase()}`;
      // Short label: everything after the dash/em-dash
      const shortLabel = text.replace(/^(?:PHẦN|PART) [A-F]\s*[—–-]+\s*/, "").trim();
      parts.push({ label: text, shortLabel, id, letter });
    }
  }
  return parts;
}

/**
 * Strip "noise" sections (methodology, data gaps, open questions, limitations)
 * from markdown before rendering. Removes the heading + all content until
 * the next same-or-higher-level heading.
 */
export function stripNoiseSections(source) {
  // Heading patterns that should be removed
  const NOISE = [
    /CÁC CÂU HỎI MỞ/i,
    /OPEN QUESTIONS/i,
    /KHOẢNG TRỐNG DỮ LIỆU/i,
    /DATA GAPS/i,
    /Sources & Methodology/i,
    /Nguồn dữ liệu.*tham chiếu/i,
    /Phương pháp/i,
    /Ghi chú citation/i,
    /Limitations.*Assumptions/i,
    /Key assumptions/i,
    /Defense of Subjective Prob/i,
    /Devil'?s Advocate/i,
    /Red Team/i,
    /Methodology caveats/i,
    /Recommended next step cho user/i,
    /Consolidated.*DATA-GAP/i,
  ];

  const lines = source.split("\n");
  const out = [];
  let skipUntilLevel = null;

  for (const line of lines) {
    const headingMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text  = headingMatch[2];

      // End skip when we reach a heading at same or higher level
      if (skipUntilLevel !== null && level <= skipUntilLevel) {
        skipUntilLevel = null;
      }

      if (skipUntilLevel === null && NOISE.some(p => p.test(text))) {
        skipUntilLevel = level;
        continue; // drop this heading too
      }
    }

    if (skipUntilLevel !== null) continue;
    out.push(line);
  }

  return out.join("\n");
}

/**
 * Generate a DOM-safe id from a heading string.
 * PHẦN/PART headings get a simple "part-x" slug.
 * Others get a stripped ASCII slug.
 */
export function headingToId(text) {
  // PHẦN A / PART A
  const partMatch = text.match(/^(?:PHẦN|PART) ([A-F])/);
  if (partMatch) return `part-${partMatch[1].toLowerCase()}`;

  // Section N
  const secMatch = text.match(/^Section\s+(\d+)/i);
  if (secMatch) return `section-${secMatch[1]}`;

  // Generic: strip non-ASCII, collapse to kebab
  return text
    .replace(/[^\x00-\x7F]/g, "")   // drop Vietnamese / non-ASCII
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase()
    .slice(0, 48) || "heading";
}
