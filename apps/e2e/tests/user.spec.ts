import { test, expect } from "@playwright/test";
import type { UserDTO, CreateUserDTO } from "@repo/shared-types";

test.describe("User Feature", () => {
  test("should create a new user via API", async ({ request }) => {
    const newUser: CreateUserDTO = {
      email: "test@example.com",
      name: "Test User",
    };

    const response = await request.post("http://localhost:4000/api/users", {
      data: newUser,
    });

    expect(response.ok()).toBeTruthy();

    const user: UserDTO = await response.json();

    expect(user.id).toBeTruthy();
    expect(user.email).toBe(newUser.email);
    expect(user.name).toBe(newUser.name);
    expect(user.createdAt).toBeTruthy();
  });

  test("should validate email format", async ({ request }) => {
    const invalidUser: CreateUserDTO = {
      email: "invalid-email",
      name: "Test User",
    };

    const response = await request.post("http://localhost:4000/api/users", {
      data: invalidUser,
    });

    // Should fail validation
    expect(response.ok()).toBeFalsy();
  });
});
