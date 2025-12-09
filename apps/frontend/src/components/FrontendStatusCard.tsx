import { Monitor, HardDrive, Clock, Zap } from "lucide-react";

interface FrontendMetrics {
  renderTime: number;
  framework: string;
  buildTool: string;
  nodeVersion: string;
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

interface FrontendStatusCardProps {
  metrics: FrontendMetrics | null;
}

export function FrontendStatusCard({ metrics }: FrontendStatusCardProps) {
  if (!metrics) {
    return (
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 shadow-xl shadow-purple-500/10 mt-6 animate-pulse">
        {/* Header Skeleton */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <div className="w-6 h-6 bg-slate-700 rounded"></div>
          </div>
          <div className="flex-1">
            <div className="h-6 bg-slate-700 rounded w-48 mb-2"></div>
            <div className="h-4 bg-slate-700 rounded w-32"></div>
          </div>
          <div className="w-20 h-7 bg-slate-700 rounded-full"></div>
        </div>

        {/* Metric Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 bg-slate-700 rounded"></div>
                <div className="h-3 bg-slate-700 rounded w-20"></div>
              </div>
              <div className="h-6 bg-slate-700 rounded w-24 mb-1"></div>
              <div className="h-3 bg-slate-700 rounded w-32"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 shadow-xl shadow-purple-500/10 mt-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-500/10 rounded-lg">
          <Monitor className="w-6 h-6 text-purple-400" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-white">Frontend Performance</h2>
          <p className="text-sm text-gray-400">
            {metrics.framework} + {metrics.buildTool} + {metrics.nodeVersion}
          </p>
        </div>
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full">
          <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
          <span className="text-sm text-purple-400 font-medium">Client</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-400">Render Time</span>
          </div>
          <p className="text-lg font-semibold text-white">
            {metrics.renderTime}ms
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {metrics.timing.firstPaint
              ? `First Paint: ${metrics.timing.firstPaint}ms`
              : "DOM Content Loaded"}
          </p>
        </div>

        {metrics.memory && (
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
            <div className="flex items-center gap-2 mb-2">
              <HardDrive className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-400">JS Heap</span>
            </div>
            <p className="text-lg font-semibold text-white">
              {metrics.memory.used}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Limit: {metrics.memory.limit}
            </p>
          </div>
        )}

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-400">Load Complete</span>
          </div>
          <p className="text-lg font-semibold text-white">
            {metrics.timing.loadComplete}ms
          </p>
          <p className="text-xs text-gray-500 mt-1">
            DOMContentLoaded: {metrics.timing.domContentLoaded}ms
          </p>
        </div>
      </div>
    </div>
  );
}
