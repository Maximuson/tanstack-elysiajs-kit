import { RefreshCw } from "lucide-react";

interface ServerControlsProps {
  liveView: boolean;
  isRefreshing: boolean;
  lastFetchDuration: number | null;
  showDuration: boolean;
  onLiveViewChange: (value: boolean) => void;
  onRefresh: () => void;
}

export function ServerControls({
  liveView,
  isRefreshing,
  lastFetchDuration,
  showDuration,
  onLiveViewChange,
  onRefresh,
}: ServerControlsProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Live View Checkbox */}
      <label
        className={`flex items-center gap-2 px-3 py-1.5 bg-slate-900/50 border border-slate-700 rounded-lg cursor-pointer hover:border-cyan-500/50 transition-all duration-300 ${
          liveView ? "border-cyan-500/50 bg-cyan-500/5" : ""
        }`}
      >
        <input
          type="checkbox"
          checked={liveView}
          onChange={(e) => onLiveViewChange(e.target.checked)}
          className="w-4 h-4 rounded border-slate-600 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 focus:ring-2 bg-slate-800"
        />
        <span className="text-sm text-gray-300 font-medium whitespace-nowrap">
          Live View
        </span>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            liveView ? "w-2 opacity-100" : "w-0 opacity-0"
          }`}
        >
          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse block"></span>
        </div>
      </label>

      {/* Refresh Button with Duration Tooltip */}
      <div className="relative">
        {/* Duration Tooltip */}
        {(showDuration || liveView) && lastFetchDuration !== null && (
          <div
            className={`absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-800 border border-cyan-500/50 rounded-lg shadow-lg whitespace-nowrap transition-all duration-300 ${
              showDuration || liveView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            }`}
          >
            <div className="text-xs font-mono text-cyan-400">
              {lastFetchDuration}ms
            </div>
            {/* Arrow */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 border-r border-b border-cyan-500/50 rotate-45"></div>
          </div>
        )}

        <button
          onClick={onRefresh}
          disabled={isRefreshing || liveView}
          className="p-2 bg-slate-900/50 border border-slate-700 rounded-lg hover:border-cyan-500/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Refresh server info"
        >
          <RefreshCw
            className={`w-4 h-4 text-cyan-400 ${
              isRefreshing || liveView ? "animate-spin" : ""
            }`}
          />
        </button>
      </div>

      {/* Status Badge */}
      <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
        <span className="text-sm text-green-400 font-medium">Online</span>
      </span>
    </div>
  );
}
