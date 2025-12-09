# TanStack Start + Elysia Monorepo

A modern full-stack application with separated backend and frontend, featuring:

- **Backend**: Elysia API on Bun with feature-based DDD architecture
- **Frontend**: TanStack Start with type-safe API integration
- **Shared Types**: End-to-end type safety
- **E2E Testing**: Playwright with multi-browser support

## Architecture

This is a **monorepo** using Bun workspaces:

```
tanstack-elysiajs-kit/
├── apps/
│   ├── backend/          # Elysia API on Bun (port 4000)
│   ├── frontend/         # TanStack Start (port 3000)
│   └── e2e/              # Playwright E2E tests
└── packages/
    └── shared-types/     # Shared TypeScript types
```

### Backend (Feature-Based DDD)

Each feature follows Domain-Driven Design with three layers:

- **Domain**: Entities, value objects, repository interfaces
- **Application**: Use cases, business logic orchestration
- **Infrastructure**: HTTP controllers, repository implementations

**Current Features**:

- `server-info/` - Server runtime information
- `user/` - User management with email validation

### Frontend (TanStack Start)

- File-based routing with TanStack Router
- Eden Treaty client for type-safe API calls
- Tailwind CSS v4 for styling

### Shared Types

Feature-based type definitions shared between backend and frontend:

- `server-info/ServerInfoDTO.ts`
- `user/UserDTO.ts`, `CreateUserDTO.ts`

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed

### Installation

```bash
# Install all dependencies
bun install

# Install Playwright browsers (first time only)
cd apps/e2e
bunx playwright install
cd ../..
```

### Development

```bash
# Start both backend and frontend concurrently
bun run dev

# Or start individually:
bun run dev:backend   # Backend on port 4000
bun run dev:frontend  # Frontend on port 3000
```

### Testing

```bash
# Run E2E tests (auto-starts servers)
cd apps/e2e
bun run test

# Run with UI mode
bun run test:ui

# Run in headed mode (see browser)
bun run test:headed

# Debug specific test
bun run test:debug tests/server-info.spec.ts

# View test report
bun run report
```

### Building for Production

```bash
# Build all packages
bun run build
```

## API Endpoints

### Server Info

- **GET** `/api/info` - Returns server runtime information
  - Bun version, platform details, memory usage, uptime

### User Management

- **POST** `/api/users` - Create a new user
  - Body: `{ email: string, name: string }`
  - Validates email format
  - Returns: `UserDTO` with ID and timestamp

## Project Structure

### Backend (`apps/backend/`)

```
src/
  server-info/
    domain/              # ServerInfoService
    application/         # GetServerInfo use case
    infrastructure/      # ServerInfoController
  user/
    domain/              # User entity, UserEmail value object, UserRepository
    application/         # CreateUser use case
    infrastructure/      # UserController, UserRepositoryImpl
  shared/                # Shared utilities
  index.ts               # Server entry point
```

### Frontend (`apps/frontend/`)

```
src/
  routes/                # TanStack Router file-based routes
  components/            # Reusable UI components
  lib/
    api-client.ts        # Eden Treaty client
  styles.css             # Global styles
```

### E2E Tests (`apps/e2e/`)

```
tests/
  server-info.spec.ts    # Server info feature tests
  user.spec.ts           # User creation and validation tests
playwright.config.ts     # Playwright configuration
```

## Adding New Features

### 1. Create Shared Types

```typescript
// packages/shared-types/src/my-feature/MyFeatureDTO.ts
export interface MyFeatureDTO {
  id: string;
  name: string;
}

// packages/shared-types/src/index.ts
export * from "./my-feature/MyFeatureDTO";
```

### 2. Create Backend Feature

```
apps/backend/src/my-feature/
  domain/
    MyFeature.ts         # Entity
    MyFeatureRepository.ts
  application/
    CreateMyFeature.ts   # Use case
  infrastructure/
    MyFeatureController.ts
    MyFeatureRepositoryImpl.ts
```

### 3. Register Controller

```typescript
// apps/backend/src/index.ts
import { myFeatureController } from "./my-feature/infrastructure/MyFeatureController";

const app = new Elysia()
  // ...
  .group(
    "/api",
    (app) =>
      app.use(serverInfoController).use(userController).use(myFeatureController) // Add here
  );
```

### 4. Use in Frontend

```typescript
// apps/frontend/src/routes/my-route.tsx
import { api } from "../lib/api-client";
import type { MyFeatureDTO } from "@repo/shared-types";

const data = await api.api["my-feature"].get();
```

### 5. Add E2E Tests

```typescript
// apps/e2e/tests/my-feature.spec.ts
import { test, expect } from "@playwright/test";
import type { MyFeatureDTO } from "@repo/shared-types";

test("should fetch my feature", async ({ request }) => {
  const response = await request.get("http://localhost:4000/api/my-feature");
  expect(response.ok()).toBeTruthy();
});
```

## Technology Stack

- **Backend Runtime**: Bun
- **Backend Framework**: ElysiaJS
- **Frontend Framework**: React 19 + TanStack Start
- **Router**: TanStack Router (file-based)
- **Styling**: Tailwind CSS v4
- **Type Safety**: TypeScript + Eden Treaty
- **Testing**: Playwright
- **Package Manager**: Bun
- **Monorepo**: Bun workspaces

## Key Features

✅ **Feature-Based DDD** - Modular, self-contained features  
✅ **Type Safety** - End-to-end type safety with shared types  
✅ **Bun Runtime** - Maximum performance for backend  
✅ **Eden Treaty** - Type-safe API client with autocomplete  
✅ **E2E Testing** - Comprehensive testing with Playwright  
✅ **Monorepo** - Single repository for easy refactoring  
✅ **Hot Reload** - Fast development with watch mode

## Learn More

- [TanStack Start](https://tanstack.com/start)
- [TanStack Router](https://tanstack.com/router)
- [ElysiaJS](https://elysiajs.com)
- [Bun](https://bun.sh)
- [Playwright](https://playwright.dev)
- [Tailwind CSS](https://tailwindcss.com)

## License

MIT
