import { createFileRoute } from "@tanstack/react-router";
import { Rocket, ExternalLink, CheckCircle2 } from "lucide-react";
import type { ServerInfoDTO } from "@repo/shared-types";
import { api } from "../lib/api-client";
import { useServerInfo } from "../hooks/useServerInfo";
import { useFrontendMetrics } from "../hooks/useFrontendMetrics";
import { ServerStatusCard } from "../components/ServerStatusCard";
import { FrontendStatusCard } from "../components/FrontendStatusCard";
import { FeatureGrid } from "../components/FeatureGrid";
import { NextSteps } from "../components/NextSteps";
import { FEATURES, NEXT_STEPS } from "../constants/homePageData";

// Loader to prefetch server info on SSR
async function getServerInfo(): Promise<ServerInfoDTO | null> {
  try {
    const response = await api.api.info.get();

    if (response.data?.ssr) {
      return response.data;
    }

    return null;
  } catch (error) {
    console.error("Failed to fetch server info:", error);
    return null;
  }
}

export const Route = createFileRoute("/")({
  loader: getServerInfo,
  component: HomePage,
});

function HomePage() {
  const initialData = Route.useLoaderData();

  const {
    serverInfo,
    lastFetchDuration,
    isRefreshing,
    isLoading: isServerInfoLoading,
    liveView,
    showDuration,
    handleRefresh,
    setLiveView,
  } = useServerInfo(initialData);

  const frontendMetrics = useFrontendMetrics();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>

        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6">
              <Rocket className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-300 font-medium">
                Monorepo Starter Kit
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                TanStack Start
              </span>
              <br />
              <span className="text-gray-300">
                + <span className="text-blue-400">Elysia</span> on{" "}
                <span className="text-purple-400">Bun</span>
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              A modern full-stack monorepo with separated backend (DDD),
              type-safe frontend, shared types, and E2E testing ready to go.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com/maximuson/tanstack-elysiajs-kit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
              >
                <ExternalLink className="w-4 h-4" />
                View on GitHub
              </a>
              <a
                href="https://tanstack.com/start"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-all border border-slate-700"
              >
                Documentation
              </a>
            </div>
          </div>

          {/* Server Info Card */}
          <ServerStatusCard
            serverInfo={serverInfo}
            liveView={liveView}
            isRefreshing={isRefreshing}
            isLoading={isServerInfoLoading}
            lastFetchDuration={lastFetchDuration}
            showDuration={showDuration}
            onLiveViewChange={setLiveView}
            onRefresh={handleRefresh}
          />

          {/* Frontend Performance Card */}
          <FrontendStatusCard metrics={frontendMetrics} />
        </div>
      </section>

      {/* Features Section */}
      <FeatureGrid features={FEATURES} />

      {/* Next Steps Section */}
      <NextSteps steps={NEXT_STEPS} />

      {/* Ready to Build Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/20 rounded-xl p-8">
          <div className="flex items-start gap-4">
            <CheckCircle2 className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Ready to Build
              </h3>
              <p className="text-gray-400 mb-4">
                Your development environment is set up and ready. Start by
                editing{" "}
                <code className="px-2 py-1 bg-slate-900/80 rounded text-cyan-400 text-sm">
                  apps/frontend/src/routes/index.tsx
                </code>
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/README.md"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-all border border-slate-700"
                >
                  Read Full Documentation
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
          <p>
            Built with{" "}
            <span className="text-cyan-400 font-semibold">TanStack Start</span>,{" "}
            <span className="text-blue-400 font-semibold">Elysia</span>, and{" "}
            <span className="text-purple-400 font-semibold">Bun</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
