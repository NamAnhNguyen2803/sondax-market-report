import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { T } from "./data/colors.js";
import Sidebar    from "./components/Sidebar.jsx";
import AsiaReport from "./reports/asia/index.jsx";

// Lazy-load MKT-001 (heavy markdown chunks ~700KB) — loads only when user navigates to it
const Mkt001Report = lazy(() => import("./reports/mkt-001/index.jsx"));
// Lazy-load RPT-001 (Vietnam Tours EN Inbound market overview)
const Rpt001Report = lazy(() => import("./reports/rpt-001/index.jsx"));

function LoadingPane() {
  return (
    <div style={{ color: T.inkSoft, fontSize: 13, padding: "40px 0", textAlign: "center" }}>
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

// Default landing route per report = home pane (L1), not a section.
const DEFAULT_SECTION = {
  asia:      "asia-home",
  "rpt-001": "rpt-home",
  "mkt-001": "mkt-home",
};

export default function App() {
  const [view, setView] = useState({ report: "asia", section: DEFAULT_SECTION.asia });
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile();
  const mainRef = useRef(null);

  // Scroll to top whenever the active section changes
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [view.report, view.section]);

  // Wrapper: when user clicks report header in sidebar, route to that report's L1 home.
  const goReport = (report, section) => {
    setView({ report, section: section ?? DEFAULT_SECTION[report] ?? "" });
    setMobileOpen(false);
  };

  const sidebarContainerStyle = isMobile
    ? {
        position: "fixed",
        top: 0, left: 0, bottom: 0,
        width: 244,
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

  const reportLabel =
    view.report === "asia"    ? "Asia → Vietnam · 2025"
  : view.report === "rpt-001" ? "RPT-001 · VN Tours May–Oct"
  :                              "MKT-001 · Cafe + Cruise";

  return (
    <div style={{
      display: "flex", minHeight: "100vh",
      background: T.bg, color: T.ink,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    }}>

      {/* Mobile overlay backdrop */}
      {isMobile && mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(45,27,61,0.4)", zIndex: 98 }}
        />
      )}

      {/* Sidebar */}
      <div style={sidebarContainerStyle}>
        <Sidebar
          view={view}
          setView={setView}
          goReport={goReport}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
      </div>

      {/* Main area */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Top bar — V4 lavender soft surface */}
        <header style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "12px 22px",
          background: "rgba(244,241,248,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${T.line}`,
          position: "sticky", top: 0, zIndex: 50, flexShrink: 0,
        }}>
          {isMobile && (
            <button
              onClick={() => setMobileOpen(v => !v)}
              style={{
                background: T.lavenderSoft, border: `1px solid ${T.line}`,
                color: T.lavenderInk, fontSize: 16, cursor: "pointer",
                padding: "4px 10px", borderRadius: 8, fontWeight: 700,
              }}
              aria-label="Open sidebar"
            >
              ☰
            </button>
          )}
          <div style={{
            fontSize: 10, color: T.lavender, textTransform: "uppercase",
            letterSpacing: 1.6, fontWeight: 700,
          }}>
            {reportLabel}
          </div>
          <div style={{ flex: 1 }} />
          <div className="serif" style={{ fontSize: 14, color: T.ink }}>
            Sondax Travel <span style={{ color: T.inkSoft, fontSize: 11, marginLeft: 6 }}>Reports</span>
          </div>
        </header>

        {/* Scrollable content */}
        <div
          ref={mainRef}
          style={{ flex: 1, overflowY: "auto" }}
        >
          <main style={{
            padding: "26px 28px 80px",
            maxWidth: 1040,
            width: "100%",
            margin: "0 auto",
            boxSizing: "border-box",
          }}>
            {view.report === "asia" && (
              <AsiaReport
                section={view.section}
                goto={(sec) => setView({ report: "asia", section: sec })}
              />
            )}
            {view.report === "rpt-001" && (
              <Suspense fallback={<LoadingPane />}>
                <Rpt001Report
                  section={view.section}
                  from={view.from}
                  goto={(sec, from) => setView({ report: "rpt-001", section: sec, from: from ?? null })}
                />
              </Suspense>
            )}
            {view.report === "mkt-001" && (
              <Suspense fallback={<LoadingPane />}>
                <Mkt001Report
                  section={view.section}
                  goto={(sec) => setView({ report: "mkt-001", section: sec })}
                />
              </Suspense>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
