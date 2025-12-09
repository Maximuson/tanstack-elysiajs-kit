export interface ServerInfoDTO {
  title: string;
  version: string;
  server: {
    runtime: {
      name: string;
      version: string;
      revision?: string;
    };
    platform: {
      os: string;
      arch: string;
      nodeVersion: string;
    };
    memory: {
      heapUsed: string;
      heapTotal: string;
      rss: string;
    };
    uptime: string;
    environment: string;
    pid: number;
  };
  api: {
    framework: string;
    integration: string;
    typeSystem: string;
  };
  timestamp: string;
}
