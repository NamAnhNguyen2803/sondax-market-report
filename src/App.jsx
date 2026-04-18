import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { T } from "./data/colors.js";
import Sidebar    from "./components/Sidebar.jsx";
import TopHeader  from "./components/TopHeader.jsx";
import AsiaReport from "./reports/asia/index.jsx";

// Lazy-load MKT-001 (heavy markdown chunks ~700KB) — loads only when user navigates to it
const Mkt001Report = lazy(() => import("./reports/mkt-001/index.jsx"));
// Lazy-load RPT-001 (Vietnam Tours EN Inbound market overview)
const Rpt001Report = lazy(() => import("./reports/rpt-001/index.jsx"));
// Lazy-load Entity Explorer (57-entity cross-report graph)
const EntitiesReport = lazy(() => import("./reports/entities/index.jsx"));

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
  entities:  "hub",
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

  // TopHeader is ~64px tall; sidebar sticks below it.
  const HEADER_H = 64;
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
        top: HEADER_H,
        height: `calc(100vh - ${HEADER_H}px)`,
        flexShrink: 0,
        zIndex: 50,
      };

  const reportLabel =
    view.report === "asia"     ? "Asia → Vietnam · 2025"
  : view.report === "rpt-001"  ? "RPT-001 · VN Tours May–Oct"
  : view.report === "entities" ? "Entity Explorer · Cross-report graph"
  :                               "MKT-001 · Cafe + Cruise";

  return (
    <div style={{
      display: "flex", flexDirection: "column", minHeight: "100vh",
      background: T.bg, color: T.ink,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    }}>

      {/* Brand top header — full width above sidebar + main */}
      <TopHeader
        goReport={goReport}
        setMobileOpen={setMobileOpen}
        isMobile={isMobile}
      />

      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>

        {/* Mobile overlay backdrop */}
        {isMobile && mobileOpen && (
          <div
            onClick={() => setMobileOpen(false)}
            style={{ position: "fixed", inset: 0, background: "rgba(27,43,90,0.4)", zIndex: 98 }}
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

          {/* In-report context strip */}
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "10px 22px",
            background: T.bgAlt,
            borderBottom: `1px solid ${T.line}`,
            flexShrink: 0,
          }}>
            <div style={{
              fontSize: 10, color: T.navy, textTransform: "uppercase",
              letterSpacing: 1.6, fontWeight: 700,
            }}>
              {reportLabel}
            </div>
          </div>

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
                  goReport={goReport}
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
            {view.report === "entities" && (
              <Suspense fallback={<LoadingPane />}>
                <EntitiesReport
                  section={view.section}
                  goto={(sec) => setView({ report: "entities", section: sec })}
                />
              </Suspense>
            )}
          </main>
        </div>
        </div>
      </div>
    </div>
  );
}
