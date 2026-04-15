import React from "react";
import MarkdownReport from "../components/MarkdownReport.jsx";
import content from "./Risks.md?raw";

export default function Risks() {
  return <MarkdownReport source={content} />;
}
