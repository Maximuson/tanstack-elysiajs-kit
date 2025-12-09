import { test, expect } from "@playwright/test";
import type { ServerInfoDTO } from "@repo/shared-types";

test.describe("Server Info Feature", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display server information on homepage", async ({ page }) => {
    // Verify page title
    // using getByRole is more accessible and robust
    await expect(
      page.getByRole("heading", { name: /TanStack Start/i })
    ).toBeVisible();

    // Verify server status card is visible using the data-test attribute
    await expect(
      page.locator('[data-test="server-status-card"]')
    ).toContainText("Online");
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
