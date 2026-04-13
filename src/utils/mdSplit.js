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
