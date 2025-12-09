import { Server, Code2, Layers, TestTube2 } from "lucide-react";

export const FEATURES = [
  {
    icon: Server,
    title: "Separated Backend",
    description:
      "Elysia API running on Bun with feature-based DDD architecture",
  },
  {
    icon: Code2,
    title: "Type Safety",
    description: "End-to-end type safety with shared types and Eden Treaty",
  },
  {
    icon: Layers,
    title: "Monorepo Structure",
    description: "Bun workspaces with backend, frontend, and shared packages",
  },
  {
    icon: TestTube2,
    title: "E2E Testing",
    description: "Playwright tests with multi-browser support and CI/CD",
  },
] as const;

export const NEXT_STEPS = [
  {
    title: "Add a New Feature",
    description:
      "Create a new feature with domain/application/infrastructure layers",
    code: "apps/backend/src/my-feature/",
  },
  {
    title: "Create Shared Types",
    description: "Add DTOs in the shared-types package for type safety",
    code: "packages/shared-types/src/my-feature/",
  },
  {
    title: "Build the UI",
    description: "Create new routes in the frontend with type-safe API calls",
    code: "apps/frontend/src/routes/my-route.tsx",
  },
  {
    title: "Write E2E Tests",
    description: "Add Playwright tests to verify your feature works end-to-end",
    code: "apps/e2e/tests/my-feature.spec.ts",
  },
] as const;
