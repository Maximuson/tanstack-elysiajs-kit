import { useState, useEffect } from "react";

interface FrontendMetrics {
  renderTime: number;
  framework: string;
  buildTool: string;
  nodeVersion: string;
  userAgent: string;
  memory?: {
    used: string;
    limit: string;
  };
  timing: {
    domContentLoaded: number;
    loadComplete: number;
    firstPaint?: number;
  };
}

export function useFrontendMetrics(): FrontendMetrics | null {
  const [metrics, setMetrics] = useState<FrontendMetrics | null>(null);

  useEffect(() => {
    const calculateMetrics = () => {
      const performance = window.performance;
      const timing = performance.timing;

      // Calculate render time (from navigation start to DOM content loaded)
      const renderTime =
        timing.domContentLoadedEventEnd - timing.navigationStart;

      // Get memory info if available (Chrome only)
      const memoryInfo = (performance as any).memory;
      const memory = memoryInfo
        ? {
            used: `${Math.round(memoryInfo.usedJSHeapSize / 1024 / 1024)}MB`,
            limit: `${Math.round(memoryInfo.jsHeapSizeLimit / 1024 / 1024)}MB`,
          }
        : undefined;

      // Get paint timing
      const paintEntries = performance.getEntriesByType("paint");
      const firstPaint = paintEntries.find(
        (entry) => entry.name === "first-paint"
      );

      const frontendMetrics: FrontendMetrics = {
        renderTime: Math.round(renderTime),
        framework: "React 19",
        buildTool: "Vite 7",
        nodeVersion: navigator.userAgent.includes("Node")
          ? "Node.js"
          : `Browser: ${
              navigator.userAgent.split(" ").pop()?.split("/")[0] || "Unknown"
            }`,
        userAgent: navigator.userAgent,
        memory,
        timing: {
          domContentLoaded: Math.round(
            timing.domContentLoadedEventEnd - timing.navigationStart
          ),
          loadComplete: Math.round(
            timing.loadEventEnd - timing.navigationStart
          ),
          firstPaint: firstPaint ? Math.round(firstPaint.startTime) : undefined,
        },
      };

      setMetrics(frontendMetrics);
    };

    // Wait for page to fully load
    if (document.readyState === "complete") {
      calculateMetrics();
    } else {
      window.addEventListener("load", calculateMetrics);
      return () => window.removeEventListener("load", calculateMetrics);
    }
  }, []);

  return metrics;
}
