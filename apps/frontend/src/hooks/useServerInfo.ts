import { useState, useEffect } from "react";
import type { ServerInfoDTO } from "@repo/shared-types";
import { api } from "../lib/api-client";

// Fetch server info with duration tracking
async function fetchServerInfo(): Promise<{
  data: ServerInfoDTO | null;
  duration: number;
}> {
  const startTime = performance.now();
  try {
    const response = await api.api.info.get();
    const duration = Math.round(performance.now() - startTime);
    return { data: response.data || null, duration };
  } catch (error) {
    console.error("Failed to fetch server info:", error);
    const duration = Math.round(performance.now() - startTime);
    return { data: null, duration };
  }
}

interface UseServerInfoReturn {
  serverInfo: ServerInfoDTO | null;
  lastFetchDuration: number | null;
  isRefreshing: boolean;
  isLoading: boolean;
  liveView: boolean;
  showDuration: boolean;
  handleRefresh: () => Promise<void>;
  setLiveView: (value: boolean) => void;
}

export function useServerInfo(
  initialData: ServerInfoDTO | null
): UseServerInfoReturn {
  const [serverInfo, setServerInfo] = useState<ServerInfoDTO | null>(
    initialData
  );
  const [liveView, setLiveView] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(serverInfo === null);
  const [lastFetchDuration, setLastFetchDuration] = useState<number | null>(
    null
  );
  const [showDuration, setShowDuration] = useState(false);

  useEffect(() => {
    if (!initialData) {
      fetchServerInfo().then(({ data, duration }) => {
        setServerInfo(data);
        setLastFetchDuration(duration);
        setIsLoading(false);
      });
    }
  }, [initialData]);

  // Manual refresh with minimum 1 second display
  const handleRefresh = async () => {
    setIsRefreshing(true);
    const startTime = performance.now();

    const { data, duration } = await fetchServerInfo();

    setServerInfo(data);
    setLastFetchDuration(duration);

    // Keep refreshing state for at least 1 second
    const elapsedTime = performance.now() - startTime;
    const remainingTime = Math.max(0, 1000 - elapsedTime);

    setTimeout(() => {
      setIsRefreshing(false);
    }, remainingTime);

    // Show duration tooltip for 3 seconds
    setShowDuration(true);
    setTimeout(() => setShowDuration(false), 3000);
  };

  // Live view polling effect
  useEffect(() => {
    if (!liveView) return;

    const interval = setInterval(async () => {
      const { data, duration } = await fetchServerInfo();
      setServerInfo(data);
      setLastFetchDuration(duration);
    }, 1000);

    return () => clearInterval(interval);
  }, [liveView]);

  return {
    serverInfo,
    lastFetchDuration,
    isRefreshing,
    isLoading,
    liveView,
    showDuration,
    handleRefresh,
    setLiveView,
  };
}
