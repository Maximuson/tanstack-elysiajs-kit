import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Server,
  Code2,
  Layers,
  TestTube2,
  Rocket,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Cpu,
  HardDrive,
  Clock,
} from "lucide-react";
import { api } from "../lib/api-client";
import type { ServerInfoDTO } from "@repo/shared-types";

export const Route = createFileRoute("/")({ component: App });

function App() {
  const [serverInfo, setServerInfo] = useState<ServerInfoDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.api.info
      .get()
      .then((res) => {
        if (res.data) {
          setServerInfo(res.data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const features = [
    {
      icon: <Server className="w-8 h-8 text-cyan-400" />,
      title: "Separated Backend",
      description: "Elysia API running on Bun with feature-based DDD architecture",
    },
    {
      icon: <Code2 className="w-8 h-8 text-blue-400" />,
      title: "Type Safety",
      description: "End-to-end type safety with shared types and Eden Treaty",
    },
    {
      icon: <Layers className="w-8 h-8 text-purple-400" />,
      title: "Monorepo Structure",
      description: "Bun workspaces with backend, frontend, and shared packages",
    },
    {
      icon: <TestTube2 className="w-8 h-8 text-green-400" />,
      title: "E2E Testing",
      description: "Playwright tests with multi-browser support and CI/CD",
    },
  ];

  const nextSteps = [
    {
      title: "Add a New Feature",
      description: "Create a new feature with domain/application/infrastructure layers",
      code: "apps/backend/src/my-feature/",
    },
    {
      title: "Create Shared Types",
      description: "Add DTOs in the shared-types package for type safety",
      code: "packages/shared-types/src/my-feature/",
    },
    {
      title: "Build the UI",
      description: "Create new routes in the frontend with type-safe API calls",
      code: "apps/frontend/src/routes/my-route.tsx",
    },
    {
      title: "Write E2E Tests",
      description: "Add Playwright tests to verify your feature works end-to-end",
      code: "apps/e2e/tests/my-feature.spec.ts",
    },
  ];

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
              <span className="text-sm text-cyan-300 font-medium">Monorepo Starter Kit</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                TanStack Start
              </span>
              <br />
              <span className="text-gray-300">+ <span className="text-blue-400">Elysia</span> on <span className="text-purple-400">Bun</span></span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              A modern full-stack monorepo with separated backend (DDD), type-safe frontend, 
              shared types, and E2E testing ready to go.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com/yourusername/tanstack-elysiajs-learn"
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
          {loading ? (
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 animate-pulse">
              <div className="h-6 bg-slate-700 rounded w-1/3 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-slate-700 rounded w-full"></div>
                <div className="h-4 bg-slate-700 rounded w-5/6"></div>
              </div>
            </div>
          ) : serverInfo ? (
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-6 shadow-xl shadow-cyan-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-cyan-500/10 rounded-lg">
                  <Server className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Backend Server Status</h2>
                  <p className="text-sm text-gray-400">Live from {serverInfo.server.runtime.name}</p>
                </div>
                <div className="ml-auto">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-sm text-green-400 font-medium">Online</span>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm text-gray-400">Runtime</span>
                  </div>
                  <p className="text-lg font-semibold text-white">
                    {serverInfo.server.runtime.name} {serverInfo.server.runtime.version}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {serverInfo.server.platform.os} • {serverInfo.server.platform.arch}
                  </p>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="flex items-center gap-2 mb-2">
                    <HardDrive className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-gray-400">Memory</span>
                  </div>
                  <p className="text-lg font-semibold text-white">
                    {serverInfo.server.memory.heapUsed}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Total: {serverInfo.server.memory.heapTotal}
                  </p>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-gray-400">Uptime</span>
                  </div>
                  <p className="text-lg font-semibold text-white">
                    {serverInfo.server.uptime}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PID: {serverInfo.server.pid}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
              <p className="text-red-400">Failed to connect to backend server</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          What's Included
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-900/50 rounded-lg">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Next Steps Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Next Steps
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Follow these steps to start building your application with this starter kit
          </p>
        </div>

        <div className="space-y-4">
          {nextSteps.map((step, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                    {step.title}
                    <ArrowRight className="w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    {step.description}
                  </p>
                  <code className="inline-block px-3 py-1 bg-slate-900/80 border border-slate-700 rounded text-cyan-400 text-sm font-mono">
                    {step.code}
                  </code>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/20 rounded-xl p-8">
          <div className="flex items-start gap-4">
            <CheckCircle2 className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Ready to Build
              </h3>
              <p className="text-gray-400 mb-4">
                Your development environment is set up and ready. Start by editing{" "}
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
