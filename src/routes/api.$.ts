import { Elysia } from "elysia";
import { treaty } from "@elysiajs/eden";
import { createFileRoute } from "@tanstack/react-router";
import { createIsomorphicFn } from "@tanstack/react-start";

// Define the Elysia app
const app = new Elysia({ prefix: "/api" })
  .get("/", () => "Hello Elysia from TanStack Start!")
  .get("/test", () => ({ message: "This is JSON data" }));

// Create a handler for TanStack Start
const handle = ({ request }: { request: Request }) => app.fetch(request);

// Define the route
export const Route = createFileRoute("/api/$")({
  server: {
    handlers: {
      GET: handle,
      POST: handle,
      PUT: handle,
      DELETE: handle,
      PATCH: handle,
      HEAD: handle,
      OPTIONS: handle,
    },
  },
});

// Create type-safe client (Eden Treaty)
export const getTreaty = createIsomorphicFn()
  .server(() => treaty(app).api)
  .client(
    () =>
      treaty<typeof app>(
        typeof window !== "undefined"
          ? window.location.origin
          : "http://localhost:3000"
      ).api
  );
