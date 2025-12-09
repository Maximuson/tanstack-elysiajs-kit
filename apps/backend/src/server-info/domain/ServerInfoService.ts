import type { ServerInfoDTO } from "@repo/shared-types";

export class ServerInfoService {
  getInfo(): ServerInfoDTO {
    return {
      title: "Elysia API",
      version: "1.0.0",
      server: {
        runtime: {
          name: "Bun",
          version: Bun.version,
          revision: Bun.revision,
        },
        platform: {
          os: process.platform,
          arch: process.arch,
          nodeVersion: process.version,
        },
        memory: {
          heapUsed: `${Math.round(
            process.memoryUsage().heapUsed / 1024 / 1024
          )}MB`,
          heapTotal: `${Math.round(
            process.memoryUsage().heapTotal / 1024 / 1024
          )}MB`,
          rss: `${Math.round(process.memoryUsage().rss / 1024 / 1024)}MB`,
        },
        uptime: `${Math.round(process.uptime())}s`,
        environment: process.env.NODE_ENV || "development",
        pid: process.pid,
      },
      api: {
        framework: "ElysiaJS",
        integration: "TanStack Start",
        typeSystem: "Eden Treaty",
      },
      timestamp: new Date().toISOString(),
    };
  }
}
