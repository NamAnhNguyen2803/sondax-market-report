import React from "react";
import MarkdownReport from "../components/MarkdownReport.jsx";
import content from "./GTMRoadmap.md?raw";

export default function GTMRoadmap() {
  return <MarkdownReport source={content} />;
}
