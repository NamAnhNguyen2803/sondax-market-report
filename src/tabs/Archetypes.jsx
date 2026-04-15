import React from "react";
import MarkdownReport from "../components/MarkdownReport.jsx";
import content from "./Archetypes.md?raw";

export default function Archetypes() {
  return <MarkdownReport source={content} />;
}
