import { test, expect } from "@playwright/test";
import type { ServerInfoDTO } from "@repo/shared-types";

test.describe("Server Info Feature", () => {
  test("should display server information on homepage", async ({ page }) => {
    await page.goto("/");

    // Wait for page to load
    await expect(page.locator("h1")).toContainText("TANSTACK");

    // Check console for server info (logged by useEffect)
    const logs: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "log") {
        logs.push(msg.text());
      }
    });

    // Wait for API call
    await page.waitForTimeout(1000);

    // Verify server info was logged
    const serverInfoLog = logs.find(
      (log) => log.includes("Server Info") || log.includes("Bun")
    );
    expect(serverInfoLog).toBeTruthy();
  });

  test("should fetch server info from API", async ({ request }) => {
    const response = await request.get("http://localhost:4000/api/info");

    expect(response.ok()).toBeTruthy();

    const data: ServerInfoDTO = await response.json();

    // Verify response structure
    expect(data.title).toBe("Elysia API");
    expect(data.version).toBe("1.0.0");
    expect(data.server.runtime.name).toBe("Bun");
    expect(data.server.runtime.version).toBeTruthy();
    expect(data.api.framework).toBe("ElysiaJS");
    expect(data.timestamp).toBeTruthy();
  });
});
