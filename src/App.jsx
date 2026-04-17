import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { C } from "./data/colors.js";
import Sidebar    from "./components/Sidebar.jsx";
import AsiaReport from "./reports/asia/index.jsx";

// Lazy-load MKT-001 (heavy markdown chunks ~700KB) — loads only when user navigates to it
const Mkt001Report = lazy(() => import("./reports/mkt-001/index.jsx"));
// Lazy-load RPT-001 (Vietnam Tours EN Inbound market overview)
const Rpt001Report = lazy(() => import("./reports/rpt-001/index.jsx"));

function LoadingPane() {
  return (
    <div style={{ color: C.muted, fontSize: 13, padding: "40px 0", textAlign: "center" }}>
      Đang tải…
    </div>
  );
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return isMobile;
}

export default function App() {
  const [view, setView] = useState({ report: "asia", section: "overview" });
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile();
  const mainRef = useRef(null);

  // Scroll to top whenever the active section changes
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [view.report, view.section]);

  const sidebarContainerStyle = isMobile
    ? {
        position: "fixed",
        top: 0, left: 0, bottom: 0,
        width: 232,
        transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.25s ease",
        zIndex: 99,
      }
    : {
        position: "sticky",
        top: 0,
        height: "100vh",
        flexShrink: 0,
        zIndex: 50,
      };

  return (
    <div style={{
      display: "flex", minHeight: "100vh",
      background: C.bg, color: C.text,
      fontFamily: "'Segoe UI', -apple-system, sans-serif",
    }}>

      {/* Mobile overlay backdrop */}
      {isMobile && mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{ position: "fixed", inset: 0, background: "#000c", zIndex: 98 }}
        />
      )}

      {/* Sidebar */}
      <div style={sidebarContainerStyle}>
        <Sidebar
          view={view}
          setView={setView}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
      </div>

      {/* Main area */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Top bar */}
        <header style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "10px 20px",
          background: "linear-gradient(90deg,#0F172A,#1E3A5F 60%,#0F172A)",
          borderBottom: `1px solid ${C.border}`,
          position: "sticky", top: 0, zIndex: 50, flexShrink: 0,
        }}>
          {isMobile && (
            <button
              onClick={() => setMobileOpen(v => !v)}
              style={{ background: "none", border: "none", color: C.muted, fontSize: 18, cursor: "pointer", padding: "2px 6px" }}
            >
              ☰
            </button>
          )}
          <div style={{ fontSize: 10, color: C.accent, textTransform: "uppercase", letterSpacing: 2, fontWeight: 700 }}>
            {view.report === "asia" ? "BÁO CÁO TỔNG HỢP" : view.report === "rpt-001" ? "RPT-001 · VN TOURS MAY–OCT" : "MARKET ANALYSIS · MKT-001"}
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ fontSize: 10, color: C.muted }}>Sondax Travel Reports</div>
        </header>

        {/* Scrollable content */}
        <div
          ref={mainRef}
          style={{ flex: 1, overflowY: "auto" }}
        >
          <main style={{
            padding: "20px 24px 80px",
            maxWidth: 960,
            width: "100%",
            margin: "0 auto",
            boxSizing: "border-box",
          }}>
            {view.report === "asia" && <AsiaReport tab={view.section} />}
            {view.report === "rpt-001" && (
              <Suspense fallback={<LoadingPane />}>
                <Rpt001Report
                  section={view.section}
                  goto={(sec) => setView({ report: "rpt-001", section: sec })}
                />
              </Suspense>
            )}
            {view.report === "mkt-001" && (
              <Suspense fallback={<LoadingPane />}>
                <Mkt001Report section={view.section} />
              </Suspense>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
