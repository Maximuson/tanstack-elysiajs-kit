import { Server, Cpu, HardDrive, Clock } from "lucide-react";
import type { ServerInfoDTO } from "@repo/shared-types";
import { ServerControls } from "./ServerControls";

interface ServerStatusCardProps {
  serverInfo: ServerInfoDTO | null;
  liveView: boolean;
  isRefreshing: boolean;
  isLoading: boolean;
  lastFetchDuration: number | null;
  showDuration: boolean;
  onLiveViewChange: (value: boolean) => void;
  onRefresh: () => void;
}

export function ServerStatusCard({
  serverInfo,
  liveView,
  isRefreshing,
  isLoading,
  lastFetchDuration,
  showDuration,
  onLiveViewChange,
  onRefresh,
}: ServerStatusCardProps) {
  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 shadow-xl shadow-blue-500/10 mt-6 animate-pulse">
        {/* Header Skeleton */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-500/10 rounded-lg">
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

  if (!serverInfo) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
        <p className="text-red-400">Failed to connect to backend server</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-6 shadow-xl shadow-cyan-500/10">
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <div className="p-2 bg-cyan-500/10 rounded-lg">
          <Server className="w-6 h-6 text-cyan-400" />
        </div>
        <div className="flex-1 min-w-[200px]">
          <h2 className="text-xl font-bold text-white">
            Backend Server Status
          </h2>
          <p className="text-sm text-gray-400">
            Live from {serverInfo.server.runtime.name}
          </p>
        </div>

        <ServerControls
          liveView={liveView}
          isRefreshing={isRefreshing}
          lastFetchDuration={lastFetchDuration}
          showDuration={showDuration}
          onLiveViewChange={onLiveViewChange}
          onRefresh={onRefresh}
        />
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
  );
}
