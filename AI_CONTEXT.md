# AI Context Documentation

## Project Overview

- **Name**: tanstack-elysiajs-learn
- **Description**: A monorepo combining TanStack Start (full-stack React framework) with a standalone ElysiaJS backend running on Bun, featuring feature-based DDD architecture and E2E testing.
- **Architecture**: Monorepo with Bun workspaces
- **Tech Stack**:
  - **Backend**: ElysiaJS on Bun runtime (port 4000)
  - **Frontend**: TanStack Start with Vite (port 3000)
  - **Shared Types**: Centralized TypeScript definitions
  - **E2E Testing**: Playwright with multi-browser support
  - **Styling**: Tailwind CSS v4
  - **Language**: TypeScript

## Architecture & Patterns

### Monorepo Structure

The project uses **Bun workspaces** to manage multiple packages:

```
tanstack-elysiajs-learn/
├── apps/
│   ├── backend/          # Elysia API on Bun
│   ├── frontend/         # TanStack Start app
│   └── e2e/              # Playwright E2E tests
└── packages/
    └── shared-types/     # Shared TypeScript types
```

### 1. Backend (Elysia on Bun)

**Location**: `apps/backend/`

**Architecture**: Feature-based Domain-Driven Design (DDD)

Each feature is organized as a vertical slice with three layers:

#### Feature Structure
```
src/
  {feature-name}/
    domain/              # Entities, value objects, repository interfaces
    application/         # Use cases, business logic orchestration
    infrastructure/      # Controllers, repository implementations
```

#### Current Features

**Server Info** (`src/server-info/`):
- **Domain**: `ServerInfoService` - Collects server runtime information
- **Application**: `GetServerInfo` - Use case for retrieving server info
- **Infrastructure**: `ServerInfoController` - HTTP endpoint at `/api/info`

**User** (`src/user/`):
- **Domain**: 
  - `User` entity
  - `UserEmail` value object with validation
  - `UserRepository` interface
- **Application**: `CreateUser` use case
- **Infrastructure**: 
  - `UserRepositoryImpl` (in-memory)
  - `UserController` - HTTP endpoint at `/api/users`

#### Key Files
- `src/index.ts` - Main server entry point, aggregates all feature controllers
- `package.json` - Backend dependencies (Elysia, @elysiajs/cors, shared-types)
- `tsconfig.json` - TypeScript config with Bun types

#### Runtime
- **Runs on**: Bun (native performance)
- **Port**: 4000
- **CORS**: Configured for frontend at localhost:3000

### 2. Frontend (TanStack Start)

**Location**: `apps/frontend/`

**Key Components**:
- **Routes**: File-based routing in `src/routes/`
- **API Client**: `src/lib/api-client.ts` - Eden Treaty client for type-safe API calls
- **Layout**: `src/routes/__root.tsx` - Global HTML shell and header
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite` plugin

**API Integration**:
- Uses **Eden Treaty** to consume backend API with full type safety
- API client imports backend `App` type for autocomplete
- Environment variable `VITE_API_URL` configures backend URL

**Example Usage**:
```typescript
import { api } from '../lib/api-client';

// Type-safe API call
const response = await api.api.info.get();
```

### 3. Shared Types Package

**Location**: `packages/shared-types/`

**Purpose**: Centralized type definitions shared between backend and frontend

**Organization**: Feature-based structure matching backend features
```
src/
  server-info/
    ServerInfoDTO.ts
  user/
    UserDTO.ts
    CreateUserDTO.ts
  index.ts              # Central export point
```

**Usage**:
- Backend: `import type { UserDTO } from "@repo/shared-types"`
- Frontend: `import type { ServerInfoDTO } from "@repo/shared-types"`
- E2E Tests: `import type { CreateUserDTO } from "@repo/shared-types"`

### 4. E2E Testing (Playwright)

**Location**: `apps/e2e/`

**Features**:
- Auto-starts backend and frontend servers before tests
- Multi-browser testing (Chrome, Firefox, Safari)
- Type-safe assertions using shared types
- CI/CD integration with GitHub Actions

**Test Files**:
- `tests/server-info.spec.ts` - Server info feature tests
- `tests/user.spec.ts` - User creation and validation tests

**Configuration**:
- `playwright.config.ts` - Playwright configuration
- `.github/workflows/e2e.yml` - CI/CD workflow

## Directory Structure

- `apps/backend/src/`
  - `server-info/` - Server information feature
  - `user/` - User management feature
  - `shared/` - Shared utilities
  - `index.ts` - Server entry point
- `apps/frontend/src/`
  - `routes/` - TanStack Router file-based routes
  - `components/` - Reusable UI components
  - `lib/` - Utilities and API client
- `apps/e2e/`
  - `tests/` - Playwright E2E tests
  - `playwright.config.ts` - Test configuration
- `packages/shared-types/src/`
  - Feature-based type definitions

## Key Configuration Files

- **Root**:
  - `package.json` - Workspace configuration with Bun workspaces
- **Backend**:
  - `apps/backend/package.json` - Elysia dependencies
  - `apps/backend/tsconfig.json` - Bun types, workspace paths
- **Frontend**:
  - `apps/frontend/package.json` - TanStack dependencies
  - `apps/frontend/tsconfig.json` - Workspace paths for shared types
  - `apps/frontend/vite.config.ts` - Vite plugins
  - `apps/frontend/.env.development` - API URL configuration
- **E2E**:
  - `apps/e2e/package.json` - Playwright dependencies
  - `apps/e2e/playwright.config.ts` - Test configuration

## Development Commands

```bash
# Install dependencies
bun install

# Run both backend and frontend concurrently
bun run dev

# Run backend only (port 4000)
bun run dev:backend

# Run frontend only (port 3000)
bun run dev:frontend

# Run E2E tests
cd apps/e2e
bun run test

# E2E tests with UI
bun run test:ui

# Build all packages
bun run build
```

## API Endpoints

### Server Info
- **GET** `/api/info` - Returns server runtime information (Bun version, platform, memory)

### User Management
- **POST** `/api/users` - Create a new user
  - Body: `{ email: string, name: string }`
  - Validation: Email format via `UserEmail` value object

## Important Notes for AI Agents

### Backend Development
- **Feature-based DDD**: When adding new features, create a new directory under `apps/backend/src/` with `domain/`, `application/`, and `infrastructure/` subdirectories
- **Domain Layer**: Contains entities, value objects, and repository interfaces (no external dependencies)
- **Application Layer**: Contains use cases that orchestrate domain logic
- **Infrastructure Layer**: Contains HTTP controllers and repository implementations
- **Type Safety**: Always import DTOs from `@repo/shared-types`

### Frontend Development
- **API Calls**: Use the Eden Treaty client from `src/lib/api-client.ts` for type-safe API calls
- **Shared Types**: Import DTOs from `@repo/shared-types` for consistency
- **Environment**: API URL is configured via `VITE_API_URL` in `.env.development`

### Testing
- **E2E Tests**: Add new test files in `apps/e2e/tests/` following the pattern of existing tests
- **Type Safety**: Use shared types for test assertions
- **Auto-start**: Playwright config automatically starts backend and frontend servers

### Type Definitions
- **Shared Types**: Add new DTOs in `packages/shared-types/src/` organized by feature
- **Export**: Update `packages/shared-types/src/index.ts` to export new types

## Architecture Benefits

1. **Separation of Concerns**: Backend and frontend are completely separated
2. **Type Safety**: End-to-end type safety via shared types and Eden Treaty
3. **Performance**: Backend runs on Bun for maximum performance
4. **Modularity**: Feature-based DDD makes it easy to add/remove features
5. **Testing**: Comprehensive E2E testing with Playwright
6. **Monorepo**: Single repository for easy refactoring and dependency management
